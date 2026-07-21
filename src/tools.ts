import { Type } from '@sinclair/typebox';

export const SCHEMA_TOOLS = [
  {
    name: 'set_components',
    description: 'Initialize or completely replace the page schema with new components and optional dataModel',
    parameters: Type.Object({
      components: Type.Array(Type.Object({
        id: Type.String(),
        component: Type.String(),
      }, { additionalProperties: true })),
      dataModel: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
    }),
  },
  {
    name: 'update_components',
    description: 'Update existing components by ID or add new components if ID does not exist',
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
