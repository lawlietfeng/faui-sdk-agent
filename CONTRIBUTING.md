# Contributing to faui-agent

感谢你对 faui-agent 的关注！欢迎提交 Issue 和 Pull Request。

## 开发环境

```bash
git clone https://github.com/lawlietfeng/faui-agent.git
cd faui-agent
npm install
npm run typecheck
npm run build
```

## 项目结构

```
src/
├── agent.ts              # FauiAgent 用户接口，配置定义
├── agent-loop.ts         # 核心 agent 循环（同步/流式/工具模式）
├── tool-executor.ts      # 工具执行器（参数验证 + schema 操作）
├── tools.ts              # 工具定义（SCHEMA_TOOLS）
├── tool-system-prompt.ts # 工具模式系统提示词
├── skill-store.ts        # Skill 加载与缓存
├── skills/               # 内置 skills
│   ├── component-catalog.ts
│   ├── layout-patterns.ts
│   ├── data-binding.ts
│   └── pitfalls.ts
├── types.ts              # 类型定义
└── index.ts              # 公开 API 导出
```

## 提交 Pull Request

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feat/my-feature`
3. 确保通过检查：`npm run typecheck && npm run build`
4. 提交代码，commit message 遵循 [Conventional Commits](https://www.conventionalcommits.org/)
5. 推送并创建 PR

## 代码规范

- TypeScript strict 模式（含 noUnusedLocals、noUnusedParameters、noImplicitReturns）
- 工具参数必须有运行时验证，不允许裸 `as` 断言
- 错误处理不允许空 catch 块

## 许可证

本项目采用 [AGPL-3.0](./LICENSE) 许可证。提交 PR 即表示你同意将贡献代码以相同许可证发布。
