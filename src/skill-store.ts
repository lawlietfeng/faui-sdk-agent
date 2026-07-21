/**
 * Skill Store — 统一的 skill 加载与缓存
 *
 * 两种来源互斥：
 * - 内置 skill：编译时内联到代码中，经 terser 混淆，无明文泄露
 * - 用户自定义：运行时从指定 .md 文件路径读取
 *
 * 加载后的 skill 内容缓存在内存中，构建系统提示时
 * 通过 cache_control: { type: 'ephemeral' } 利用 Anthropic prompt caching。
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { builtinSkills } from './skills/index.js';

/** 单个 skill 定义 */
export interface SkillDef {
  name: string;
  description: string;
  content: string;
}

/** Skill Store 配置 */
export interface SkillStoreConfig {
  /** 用户自定义 skill 路径（传了就不用内置） */
  skillPath?: string;
}

// ============== 内置 skill（编译时内联） ==============
// 从 ./skills/index.js 导入，构建时会被内联并混淆

// ============== .md 文件解析 ==============

/**
 * 从 .md 文件解析 skill
 *
 * 支持 YAML frontmatter：
 * ```
 * ---
 * name: my-skill
 * description: 做某件事
 * ---
 * 正文内容...
 * ```
 *
 * 无 frontmatter 时用文件名作 name，无 description。
 */
function parseSkillFile(filePath: string, raw: string): SkillDef {
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!fmMatch) {
    return {
      name: path.basename(filePath, '.md'),
      description: '',
      content: raw.trim(),
    };
  }

  const meta: Record<string, string> = {};
  for (const line of fmMatch[1].split('\n')) {
    const kv = line.match(/^([a-zA-Z][\w-]*):\s*(.+)$/);
    if (kv) meta[kv[1]] = kv[2].replace(/^["']|["']$/g, '');
  }

  return {
    name: meta['name'] || path.basename(filePath, '.md'),
    description: meta['description'] || '',
    content: fmMatch[2].trim(),
  };
}

/** 从目录加载所有 .md 文件为 skill */
async function loadSkillsFromDir(dir: string): Promise<SkillDef[]> {
  const skills: SkillDef[] = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (err) {
    console.warn(`[faui-agent] Failed to read skill directory ${dir}:`, err);
    return skills;
  }

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    if (entry.name.startsWith('.')) continue;
    const filePath = path.join(dir, entry.name);
    try {
      const raw = await fs.readFile(filePath, 'utf-8');
      skills.push(parseSkillFile(filePath, raw));
    } catch (err) {
      console.warn(`[faui-agent] Failed to read skill file ${filePath}:`, err);
    }
  }
  return skills;
}

// ============== Skill Store ==============

export class SkillStore {
  private skills: SkillDef[] | null = null;
  private config: SkillStoreConfig;

  constructor(config: SkillStoreConfig = {}) {
    this.config = config;
  }

  /** 加载 skill（首次调用后缓存） */
  async load(): Promise<SkillDef[]> {
    if (this.skills) return this.skills;

    if (this.config.skillPath) {
      // 用户自定义路径：读 .md 文件
      this.skills = await loadSkillsFromDir(this.config.skillPath);
    } else {
      // 内置 skill：编译时内联
      this.skills = builtinSkills;
    }

    return this.skills;
  }

  /** 按 name 获取单个 skill */
  async get(name: string): Promise<SkillDef | undefined> {
    const all = await this.load();
    return all.find((s) => s.name === name);
  }

  /**
   * 构建系统提示中的 skill 目录（XML 格式）
   *
   * 只包含 name + description，不包含 content。
   * 模型匹配后通过 getSkillContent() 注入完整内容。
   */
  async buildCatalogPrompt(): Promise<string> {
    const all = await this.load();
    if (all.length === 0) return '';

    const lines = [
      'The following skills provide specialized knowledge for faui page generation.',
      'When the task matches a skill description, its content will be injected automatically.',
      '',
      '<available_skills>',
    ];
    for (const s of all) {
      lines.push('  <skill>');
      lines.push(`    <name>${escapeXml(s.name)}</name>`);
      if (s.description) {
        lines.push(`    <description>${escapeXml(s.description)}</description>`);
      }
      lines.push('  </skill>');
    }
    lines.push('</available_skills>');
    return lines.join('\n');
  }

  /**
   * 构建带 cache_control 的系统提示块
   *
   * 返回 Anthropic Messages API 的 content block 格式，
   * 利用 prompt caching 缓存 skill 目录。
   */
  async buildCachedSystemBlocks(): Promise<CacheableTextBlock[]> {
    const catalog = await this.buildCatalogPrompt();
    if (!catalog) return [];

    return [
      {
        type: 'text' as const,
        text: catalog,
        cache_control: { type: 'ephemeral' as const },
      },
    ];
  }

  /** 强制重新加载（用户更新了 .md 文件后调用） */
  invalidate(): void {
    this.skills = null;
  }
}

/** Anthropic cache_control 文本块 */
export interface CacheableTextBlock {
  type: 'text';
  text: string;
  cache_control: { type: 'ephemeral' };
}

// ============== XML escape ==============

const XML_ESCAPE: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
};

function escapeXml(str: string): string {
  return str.replace(/[&<>"']/g, (ch) => XML_ESCAPE[ch] ?? ch);
}
