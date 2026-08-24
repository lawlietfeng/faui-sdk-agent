import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { SkillStore } from './skill-store.js';

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

describe('SkillStore frontmatter', () => {
  it('parses scalar capabilities metadata', async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), 'faui-agent-skills-'));
    temporaryDirectories.push(directory);
    await writeFile(path.join(directory, 'brand-style.md'), `---\nname: brand-style\ndescription: Brand rules\ncapabilities: style\n---\nUse the brand palette.`);

    const [skill] = await new SkillStore({ skillPath: directory }).load();
    expect(skill).toMatchObject({
      name: 'brand-style',
      description: 'Brand rules',
      content: 'Use the brand palette.',
      capabilities: ['style'],
    });
  });
});
