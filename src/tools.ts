import { Type } from '@sinclair/typebox';

export const SCHEMA_TOOLS = [
  {
    name: 'set_components',
    description: 'Initialize a Form Edition schema. Use only for the first creation and always include dataModel. Component names and properties must follow the bundled faui-sdk formComponentContracts; unknown properties are rejected. Components may include a style object with React inline CSS when declared by the contract.',
    parameters: Type.Object({
      components: Type.Array(Type.Object({
        id: Type.String(),
        component: Type.String(),
      }, { additionalProperties: true })),
      dataModel: Type.Record(Type.String(), Type.Unknown()),
    }),
  },
  {
    name: 'update_components',
    description: 'Update existing components by ID or add new Form Edition components. Component names, properties, dynamic bindings, and children modes must follow the bundled faui-sdk formComponentContracts. Use this tool to add or update declared style objects when applying a UI style directive.',
    parameters: Type.Object({
      components: Type.Array(Type.Object({
        id: Type.String(),
      }, { additionalProperties: true })),
    }),
  },
  {
    name: 'remove_components',
    description: 'Remove components by their IDs and clean up any children references',
    parameters: Type.Object({
      ids: Type.Array(Type.String()),
    }),
  },
  {
    name: 'update_data_model',
    description: 'Deep merge the provided dataModel with the existing dataModel',
    parameters: Type.Object({
      dataModel: Type.Record(Type.String(), Type.Unknown()),
    }),
  },
  {
    name: 'validate_schema',
    description: '校验当前 schema 的完整性和正确性。强烈建议在每次修改后调用，确保 schema 可正常渲染。',
    parameters: Type.Object({}),
  },
];
