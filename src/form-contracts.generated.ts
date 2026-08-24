// Generated from faui-sdk/src/formComponentContracts.ts. Do not edit manually.
export const FORM_COMPONENT_CONTRACT_VERSION = 2 as const;
export const FORM_COMPONENT_CONTRACTS = {
  "box": {
    "component": "box",
    "registryNames": [
      "box"
    ],
    "documentationSlug": "box",
    "allowedProps": [
      "id",
      "component",
      "style",
      "padding",
      "layout",
      "spacing",
      "align",
      "justify",
      "children"
    ],
    "childrenMode": "component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "padding": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "layout": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "spacing": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "align": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "justify": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "children": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [],
    "events": {}
  },
  "flex": {
    "component": "flex",
    "registryNames": [
      "flex"
    ],
    "documentationSlug": "flex",
    "allowedProps": [
      "id",
      "component",
      "style",
      "vertical",
      "wrap",
      "gap",
      "flex",
      "align",
      "justify",
      "children"
    ],
    "childrenMode": "component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "vertical": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "wrap": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "gap": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "flex": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "align": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "justify": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "children": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [],
    "events": {}
  },
  "grid": {
    "component": "grid",
    "registryNames": [
      "grid"
    ],
    "documentationSlug": "grid",
    "allowedProps": [
      "id",
      "component",
      "style",
      "wrap",
      "gutter",
      "align",
      "justify",
      "children"
    ],
    "childrenMode": "component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "wrap": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "gutter": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "align": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "justify": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "children": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [],
    "events": {}
  },
  "row": {
    "component": "row",
    "registryNames": [
      "row"
    ],
    "documentationSlug": "grid",
    "allowedProps": [
      "id",
      "component",
      "style",
      "wrap",
      "gutter",
      "align",
      "justify",
      "children"
    ],
    "childrenMode": "component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "wrap": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "gutter": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "align": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "justify": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "children": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [],
    "events": {}
  },
  "col": {
    "component": "col",
    "registryNames": [
      "col"
    ],
    "documentationSlug": "grid",
    "allowedProps": [
      "id",
      "component",
      "style",
      "flex",
      "span",
      "offset",
      "push",
      "pull",
      "order",
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl",
      "children"
    ],
    "childrenMode": "component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "flex": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "span": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "offset": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "push": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "pull": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "order": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "xs": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "sm": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "md": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "lg": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "xl": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "xxl": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "children": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [],
    "events": {}
  },
  "space": {
    "component": "space",
    "registryNames": [
      "space"
    ],
    "documentationSlug": "space",
    "allowedProps": [
      "id",
      "component",
      "style",
      "direction",
      "size",
      "align",
      "split",
      "wrap",
      "children"
    ],
    "childrenMode": "component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "direction": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "size": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "align": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "split": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "wrap": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "children": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [],
    "events": {}
  },
  "layout": {
    "component": "layout",
    "registryNames": [
      "layout"
    ],
    "documentationSlug": "layout",
    "allowedProps": [
      "id",
      "component",
      "style",
      "hasSider",
      "children"
    ],
    "childrenMode": "component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "hasSider": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "children": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [],
    "events": {}
  },
  "header": {
    "component": "header",
    "registryNames": [
      "header"
    ],
    "documentationSlug": "layout",
    "allowedProps": [
      "id",
      "component",
      "style",
      "children"
    ],
    "childrenMode": "component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "children": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [],
    "events": {}
  },
  "sider": {
    "component": "sider",
    "registryNames": [
      "sider"
    ],
    "documentationSlug": "layout",
    "allowedProps": [
      "id",
      "component",
      "style",
      "width",
      "collapsible",
      "collapsedWidth",
      "reverseArrow",
      "theme",
      "children"
    ],
    "childrenMode": "component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "width": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "collapsible": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "collapsedWidth": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "reverseArrow": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "theme": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "children": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [],
    "events": {}
  },
  "content": {
    "component": "content",
    "registryNames": [
      "content"
    ],
    "documentationSlug": "layout",
    "allowedProps": [
      "id",
      "component",
      "style",
      "children"
    ],
    "childrenMode": "component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "children": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [],
    "events": {}
  },
  "footer": {
    "component": "footer",
    "registryNames": [
      "footer"
    ],
    "documentationSlug": "layout",
    "allowedProps": [
      "id",
      "component",
      "style",
      "children"
    ],
    "childrenMode": "component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "children": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [],
    "events": {}
  },
  "divider": {
    "component": "divider",
    "registryNames": [
      "divider"
    ],
    "documentationSlug": "divider",
    "allowedProps": [
      "id",
      "component",
      "style",
      "direction",
      "align",
      "content"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "content": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        },
        "description": "组件显示的文本内容。"
      },
      "direction": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "align": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      }
    },
    "eventNames": [],
    "events": {}
  },
  "form": {
    "component": "form",
    "registryNames": [
      "form"
    ],
    "documentationSlug": "form",
    "allowedProps": [
      "id",
      "component",
      "style",
      "rules",
      "submitButtonId",
      "validateTrigger",
      "layout",
      "children"
    ],
    "childrenMode": "component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "rules": {
        "schema": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "submitButtonId": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "validateTrigger": {
        "schema": {
          "type": [
            "string",
            "array"
          ]
        }
      },
      "layout": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "children": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [],
    "events": {}
  },
  "input": {
    "component": "input",
    "registryNames": [
      "input"
    ],
    "documentationSlug": "input",
    "allowedProps": [
      "id",
      "component",
      "style",
      "placeholder",
      "disabled",
      "value",
      "field",
      "rules",
      "validateTrigger",
      "on_change"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "field": {
        "schema": {
          "type": "string"
        },
        "description": "表单校验字段名；不负责替代 value.path。"
      },
      "rules": {
        "schema": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "value": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "on_change": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "placeholder": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        }
      },
      "disabled": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "validateTrigger": {
        "schema": {
          "type": [
            "string",
            "array"
          ]
        }
      }
    },
    "eventNames": [
      "on_change"
    ],
    "events": {
      "on_change": {
        "description": "值变化时执行；配置后保持旧行为并覆盖 value/checked.path 的自动回写。",
        "valueContext": "$value",
        "automaticWriteback": "only-when-event-absent",
        "generationConflictWith": [
          "value",
          "checked"
        ]
      }
    },
    "dataModelBinding": {
      "prop": "value",
      "valueTypes": [
        "string",
        "null"
      ]
    }
  },
  "textarea": {
    "component": "textarea",
    "registryNames": [
      "textarea"
    ],
    "documentationSlug": "textarea",
    "allowedProps": [
      "id",
      "component",
      "style",
      "placeholder",
      "disabled",
      "rows",
      "maxLength",
      "value",
      "field",
      "rules",
      "validateTrigger",
      "on_change"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "field": {
        "schema": {
          "type": "string"
        },
        "description": "表单校验字段名；不负责替代 value.path。"
      },
      "rules": {
        "schema": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "value": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "on_change": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "placeholder": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        }
      },
      "disabled": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "rows": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "maxLength": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "validateTrigger": {
        "schema": {
          "type": [
            "string",
            "array"
          ]
        }
      }
    },
    "eventNames": [
      "on_change"
    ],
    "events": {
      "on_change": {
        "description": "值变化时执行；配置后保持旧行为并覆盖 value/checked.path 的自动回写。",
        "valueContext": "$value",
        "automaticWriteback": "only-when-event-absent",
        "generationConflictWith": [
          "value",
          "checked"
        ]
      }
    },
    "dataModelBinding": {
      "prop": "value",
      "valueTypes": [
        "string",
        "null"
      ]
    }
  },
  "select": {
    "component": "select",
    "registryNames": [
      "select"
    ],
    "documentationSlug": "select",
    "allowedProps": [
      "id",
      "component",
      "style",
      "placeholder",
      "options",
      "mode",
      "disabled",
      "allowClear",
      "showSearch",
      "maxTagCount",
      "value",
      "field",
      "rules",
      "validateTrigger",
      "on_change"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "field": {
        "schema": {
          "type": "string"
        },
        "description": "表单校验字段名；不负责替代 value.path。"
      },
      "rules": {
        "schema": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "value": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "on_change": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "placeholder": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        }
      },
      "options": {
        "schema": {
          "type": [
            "array",
            "string"
          ]
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        }
      },
      "disabled": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "allowClear": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "showSearch": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "mode": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "maxTagCount": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "validateTrigger": {
        "schema": {
          "type": [
            "string",
            "array"
          ]
        }
      }
    },
    "eventNames": [
      "on_change"
    ],
    "events": {
      "on_change": {
        "description": "值变化时执行；配置后保持旧行为并覆盖 value/checked.path 的自动回写。",
        "valueContext": "$value",
        "automaticWriteback": "only-when-event-absent",
        "generationConflictWith": [
          "value",
          "checked"
        ]
      }
    },
    "dataModelBinding": {
      "prop": "value",
      "valueTypes": [
        "string",
        "number",
        "boolean",
        "array",
        "null"
      ]
    }
  },
  "radio": {
    "component": "radio",
    "registryNames": [
      "radio"
    ],
    "documentationSlug": "radio",
    "allowedProps": [
      "id",
      "component",
      "style",
      "options",
      "disabled",
      "value",
      "field",
      "rules",
      "validateTrigger",
      "on_change"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "field": {
        "schema": {
          "type": "string"
        },
        "description": "表单校验字段名；不负责替代 value.path。"
      },
      "rules": {
        "schema": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "value": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "on_change": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "options": {
        "schema": {
          "type": [
            "array",
            "string"
          ]
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        }
      },
      "disabled": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "validateTrigger": {
        "schema": {
          "type": [
            "string",
            "array"
          ]
        }
      }
    },
    "eventNames": [
      "on_change"
    ],
    "events": {
      "on_change": {
        "description": "值变化时执行；配置后保持旧行为并覆盖 value/checked.path 的自动回写。",
        "valueContext": "$value",
        "automaticWriteback": "only-when-event-absent",
        "generationConflictWith": [
          "value",
          "checked"
        ]
      }
    },
    "dataModelBinding": {
      "prop": "value",
      "valueTypes": [
        "string",
        "number",
        "boolean",
        "null"
      ]
    }
  },
  "checkbox": {
    "component": "checkbox",
    "registryNames": [
      "checkbox"
    ],
    "documentationSlug": "checkbox",
    "allowedProps": [
      "id",
      "component",
      "style",
      "options",
      "label",
      "disabled",
      "checked",
      "value",
      "field",
      "rules",
      "validateTrigger",
      "on_change"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "field": {
        "schema": {
          "type": "string"
        },
        "description": "表单校验字段名；不负责替代 value.path。"
      },
      "rules": {
        "schema": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "value": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        },
        "deprecated": {
          "replacement": "checked",
          "reason": "checkbox 的规范绑定属性为 checked。"
        }
      },
      "on_change": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "options": {
        "schema": {
          "type": [
            "array",
            "string"
          ]
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        }
      },
      "label": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        }
      },
      "disabled": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "checked": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "validateTrigger": {
        "schema": {
          "type": [
            "string",
            "array"
          ]
        }
      }
    },
    "eventNames": [
      "on_change"
    ],
    "events": {
      "on_change": {
        "description": "值变化时执行；配置后保持旧行为并覆盖 value/checked.path 的自动回写。",
        "valueContext": "$value",
        "automaticWriteback": "only-when-event-absent",
        "generationConflictWith": [
          "value",
          "checked"
        ]
      }
    },
    "dataModelBinding": {
      "prop": "checked",
      "valueTypes": [
        "boolean",
        "array"
      ],
      "variants": [
        {
          "when": {
            "prop": "options",
            "present": true
          },
          "valueTypes": [
            "array"
          ]
        },
        {
          "when": {
            "prop": "options",
            "present": false
          },
          "valueTypes": [
            "boolean"
          ]
        }
      ]
    },
    "deprecated": {
      "value": {
        "replacement": "checked",
        "reason": "checkbox 的规范绑定属性为 checked。"
      }
    }
  },
  "datepicker": {
    "component": "datepicker",
    "registryNames": [
      "datepicker"
    ],
    "documentationSlug": "datepicker",
    "allowedProps": [
      "id",
      "component",
      "style",
      "placeholder",
      "picker",
      "format",
      "showTime",
      "disabled",
      "disabledDate",
      "value",
      "field",
      "rules",
      "validateTrigger",
      "on_change"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "field": {
        "schema": {
          "type": "string"
        },
        "description": "表单校验字段名；不负责替代 value.path。"
      },
      "rules": {
        "schema": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "value": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "on_change": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "placeholder": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        }
      },
      "disabled": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "showTime": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "picker": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "format": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "disabledDate": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "validateTrigger": {
        "schema": {
          "type": [
            "string",
            "array"
          ]
        }
      }
    },
    "eventNames": [
      "on_change"
    ],
    "events": {
      "on_change": {
        "description": "值变化时执行；配置后保持旧行为并覆盖 value/checked.path 的自动回写。",
        "valueContext": "$value",
        "automaticWriteback": "only-when-event-absent",
        "generationConflictWith": [
          "value",
          "checked"
        ]
      }
    },
    "dataModelBinding": {
      "prop": "value",
      "valueTypes": [
        "string",
        "null"
      ]
    }
  },
  "timepicker": {
    "component": "timepicker",
    "registryNames": [
      "timepicker"
    ],
    "documentationSlug": "timepicker",
    "allowedProps": [
      "id",
      "component",
      "style",
      "format",
      "placeholder",
      "disabled",
      "minuteStep",
      "secondStep",
      "hourStep",
      "value",
      "field",
      "rules",
      "validateTrigger",
      "on_change"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "field": {
        "schema": {
          "type": "string"
        },
        "description": "表单校验字段名；不负责替代 value.path。"
      },
      "rules": {
        "schema": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "value": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "on_change": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "placeholder": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        }
      },
      "disabled": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "format": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "minuteStep": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "secondStep": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "hourStep": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "validateTrigger": {
        "schema": {
          "type": [
            "string",
            "array"
          ]
        }
      }
    },
    "eventNames": [
      "on_change"
    ],
    "events": {
      "on_change": {
        "description": "值变化时执行；配置后保持旧行为并覆盖 value/checked.path 的自动回写。",
        "valueContext": "$value",
        "automaticWriteback": "only-when-event-absent",
        "generationConflictWith": [
          "value",
          "checked"
        ]
      }
    },
    "dataModelBinding": {
      "prop": "value",
      "valueTypes": [
        "string",
        "null"
      ]
    }
  },
  "upload": {
    "component": "upload",
    "registryNames": [
      "upload"
    ],
    "documentationSlug": "upload",
    "allowedProps": [
      "id",
      "component",
      "style",
      "disabled",
      "accept",
      "multiple",
      "maxCount",
      "listType",
      "showUploadList",
      "label",
      "value",
      "field",
      "rules",
      "validateTrigger",
      "on_change"
    ],
    "childrenMode": "button-trigger",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "field": {
        "schema": {
          "type": "string"
        },
        "description": "表单校验字段名；不负责替代 value.path。"
      },
      "rules": {
        "schema": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "value": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "on_change": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "disabled": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "label": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        }
      },
      "accept": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "multiple": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "maxCount": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "listType": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "showUploadList": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "validateTrigger": {
        "schema": {
          "type": [
            "string",
            "array"
          ]
        }
      }
    },
    "eventNames": [
      "on_change"
    ],
    "events": {
      "on_change": {
        "description": "值变化时执行；配置后保持旧行为并覆盖 value/checked.path 的自动回写。",
        "valueContext": "$value",
        "automaticWriteback": "only-when-event-absent",
        "generationConflictWith": [
          "value",
          "checked"
        ]
      }
    },
    "dataModelBinding": {
      "prop": "value",
      "valueTypes": [
        "array",
        "null"
      ]
    }
  },
  "switch": {
    "component": "switch",
    "registryNames": [
      "switch"
    ],
    "documentationSlug": "switch",
    "allowedProps": [
      "id",
      "component",
      "style",
      "checkedChildren",
      "unCheckedChildren",
      "checked",
      "disabled",
      "size",
      "value",
      "field",
      "rules",
      "validateTrigger",
      "on_change"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "field": {
        "schema": {
          "type": "string"
        },
        "description": "表单校验字段名；不负责替代 value.path。"
      },
      "rules": {
        "schema": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "value": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        },
        "deprecated": {
          "replacement": "checked",
          "reason": "switch 的规范绑定属性为 checked。"
        }
      },
      "on_change": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "checked": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "disabled": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "checkedChildren": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "unCheckedChildren": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "size": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "validateTrigger": {
        "schema": {
          "type": [
            "string",
            "array"
          ]
        }
      }
    },
    "eventNames": [
      "on_change"
    ],
    "events": {
      "on_change": {
        "description": "值变化时执行；配置后保持旧行为并覆盖 value/checked.path 的自动回写。",
        "valueContext": "$value",
        "automaticWriteback": "only-when-event-absent",
        "generationConflictWith": [
          "value",
          "checked"
        ]
      }
    },
    "dataModelBinding": {
      "prop": "checked",
      "valueTypes": [
        "boolean"
      ]
    },
    "deprecated": {
      "value": {
        "replacement": "checked",
        "reason": "switch 的规范绑定属性为 checked。"
      }
    }
  },
  "inputnumber": {
    "component": "inputnumber",
    "registryNames": [
      "inputnumber"
    ],
    "documentationSlug": "inputnumber",
    "allowedProps": [
      "id",
      "component",
      "style",
      "min",
      "max",
      "step",
      "precision",
      "disabled",
      "value",
      "field",
      "rules",
      "validateTrigger",
      "on_change"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "field": {
        "schema": {
          "type": "string"
        },
        "description": "表单校验字段名；不负责替代 value.path。"
      },
      "rules": {
        "schema": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "value": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "on_change": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "disabled": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "min": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "max": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "step": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "precision": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "validateTrigger": {
        "schema": {
          "type": [
            "string",
            "array"
          ]
        }
      }
    },
    "eventNames": [
      "on_change"
    ],
    "events": {
      "on_change": {
        "description": "值变化时执行；配置后保持旧行为并覆盖 value/checked.path 的自动回写。",
        "valueContext": "$value",
        "automaticWriteback": "only-when-event-absent",
        "generationConflictWith": [
          "value",
          "checked"
        ]
      }
    },
    "dataModelBinding": {
      "prop": "value",
      "valueTypes": [
        "number",
        "null"
      ]
    }
  },
  "slider": {
    "component": "slider",
    "registryNames": [
      "slider"
    ],
    "documentationSlug": "slider",
    "allowedProps": [
      "id",
      "component",
      "style",
      "min",
      "max",
      "step",
      "range",
      "disabled",
      "value",
      "field",
      "rules",
      "validateTrigger",
      "on_change"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "field": {
        "schema": {
          "type": "string"
        },
        "description": "表单校验字段名；不负责替代 value.path。"
      },
      "rules": {
        "schema": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "value": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "on_change": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "disabled": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "min": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "max": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "step": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "range": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "validateTrigger": {
        "schema": {
          "type": [
            "string",
            "array"
          ]
        }
      }
    },
    "eventNames": [
      "on_change"
    ],
    "events": {
      "on_change": {
        "description": "值变化时执行；配置后保持旧行为并覆盖 value/checked.path 的自动回写。",
        "valueContext": "$value",
        "automaticWriteback": "only-when-event-absent",
        "generationConflictWith": [
          "value",
          "checked"
        ]
      }
    },
    "dataModelBinding": {
      "prop": "value",
      "valueTypes": [
        "number",
        "array",
        "null"
      ]
    }
  },
  "rate": {
    "component": "rate",
    "registryNames": [
      "rate"
    ],
    "documentationSlug": "rate",
    "allowedProps": [
      "id",
      "component",
      "style",
      "disabled",
      "allowHalf",
      "count",
      "value",
      "field",
      "rules",
      "validateTrigger",
      "on_change"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "field": {
        "schema": {
          "type": "string"
        },
        "description": "表单校验字段名；不负责替代 value.path。"
      },
      "rules": {
        "schema": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "value": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "on_change": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "disabled": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "allowHalf": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "count": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "validateTrigger": {
        "schema": {
          "type": [
            "string",
            "array"
          ]
        }
      }
    },
    "eventNames": [
      "on_change"
    ],
    "events": {
      "on_change": {
        "description": "值变化时执行；配置后保持旧行为并覆盖 value/checked.path 的自动回写。",
        "valueContext": "$value",
        "automaticWriteback": "only-when-event-absent",
        "generationConflictWith": [
          "value",
          "checked"
        ]
      }
    },
    "dataModelBinding": {
      "prop": "value",
      "valueTypes": [
        "number",
        "null"
      ]
    }
  },
  "cascader": {
    "component": "cascader",
    "registryNames": [
      "cascader"
    ],
    "documentationSlug": "cascader",
    "allowedProps": [
      "id",
      "component",
      "style",
      "options",
      "disabled",
      "value",
      "field",
      "rules",
      "validateTrigger",
      "on_change"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "field": {
        "schema": {
          "type": "string"
        },
        "description": "表单校验字段名；不负责替代 value.path。"
      },
      "rules": {
        "schema": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "value": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "on_change": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "options": {
        "schema": {
          "type": [
            "array",
            "string"
          ]
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        }
      },
      "disabled": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "validateTrigger": {
        "schema": {
          "type": [
            "string",
            "array"
          ]
        }
      }
    },
    "eventNames": [
      "on_change"
    ],
    "events": {
      "on_change": {
        "description": "值变化时执行；配置后保持旧行为并覆盖 value/checked.path 的自动回写。",
        "valueContext": "$value",
        "automaticWriteback": "only-when-event-absent",
        "generationConflictWith": [
          "value",
          "checked"
        ]
      }
    },
    "dataModelBinding": {
      "prop": "value",
      "valueTypes": [
        "array",
        "string",
        "number",
        "null"
      ]
    }
  },
  "treeselect": {
    "component": "treeselect",
    "registryNames": [
      "treeselect"
    ],
    "documentationSlug": "treeselect",
    "allowedProps": [
      "id",
      "component",
      "style",
      "options",
      "multiple",
      "placeholder",
      "disabled",
      "value",
      "field",
      "rules",
      "validateTrigger",
      "on_change"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "field": {
        "schema": {
          "type": "string"
        },
        "description": "表单校验字段名；不负责替代 value.path。"
      },
      "rules": {
        "schema": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "value": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "on_change": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "options": {
        "schema": {
          "type": [
            "array",
            "string"
          ]
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        }
      },
      "placeholder": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        }
      },
      "disabled": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "multiple": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "validateTrigger": {
        "schema": {
          "type": [
            "string",
            "array"
          ]
        }
      }
    },
    "eventNames": [
      "on_change"
    ],
    "events": {
      "on_change": {
        "description": "值变化时执行；配置后保持旧行为并覆盖 value/checked.path 的自动回写。",
        "valueContext": "$value",
        "automaticWriteback": "only-when-event-absent",
        "generationConflictWith": [
          "value",
          "checked"
        ]
      }
    },
    "dataModelBinding": {
      "prop": "value",
      "valueTypes": [
        "string",
        "number",
        "array",
        "null"
      ]
    }
  },
  "colorpicker": {
    "component": "colorpicker",
    "registryNames": [
      "colorpicker"
    ],
    "documentationSlug": "colorpicker",
    "allowedProps": [
      "id",
      "component",
      "style",
      "disabled",
      "value",
      "field",
      "rules",
      "validateTrigger",
      "on_change"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "field": {
        "schema": {
          "type": "string"
        },
        "description": "表单校验字段名；不负责替代 value.path。"
      },
      "rules": {
        "schema": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "value": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "on_change": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "disabled": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "validateTrigger": {
        "schema": {
          "type": [
            "string",
            "array"
          ]
        }
      }
    },
    "eventNames": [
      "on_change"
    ],
    "events": {
      "on_change": {
        "description": "值变化时执行；配置后保持旧行为并覆盖 value/checked.path 的自动回写。",
        "valueContext": "$value",
        "automaticWriteback": "only-when-event-absent",
        "generationConflictWith": [
          "value",
          "checked"
        ]
      }
    },
    "dataModelBinding": {
      "prop": "value",
      "valueTypes": [
        "string",
        "null"
      ]
    }
  },
  "transfer": {
    "component": "transfer",
    "registryNames": [
      "transfer"
    ],
    "documentationSlug": "transfer",
    "allowedProps": [
      "id",
      "component",
      "style",
      "disabled",
      "data",
      "value",
      "field",
      "rules",
      "validateTrigger",
      "on_change"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "field": {
        "schema": {
          "type": "string"
        },
        "description": "表单校验字段名；不负责替代 value.path。"
      },
      "rules": {
        "schema": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "value": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "on_change": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "disabled": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "data": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "validateTrigger": {
        "schema": {
          "type": [
            "string",
            "array"
          ]
        }
      }
    },
    "eventNames": [
      "on_change"
    ],
    "events": {
      "on_change": {
        "description": "值变化时执行；配置后保持旧行为并覆盖 value/checked.path 的自动回写。",
        "valueContext": "$value",
        "automaticWriteback": "only-when-event-absent",
        "generationConflictWith": [
          "value",
          "checked"
        ]
      }
    },
    "dataModelBinding": {
      "prop": "data",
      "valueTypes": [
        "array",
        "null"
      ]
    }
  },
  "autocomplete": {
    "component": "autocomplete",
    "registryNames": [
      "autocomplete"
    ],
    "documentationSlug": "autocomplete",
    "allowedProps": [
      "id",
      "component",
      "style",
      "placeholder",
      "options",
      "disabled",
      "value",
      "field",
      "rules",
      "validateTrigger",
      "on_change"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "field": {
        "schema": {
          "type": "string"
        },
        "description": "表单校验字段名；不负责替代 value.path。"
      },
      "rules": {
        "schema": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "value": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "on_change": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "placeholder": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        }
      },
      "options": {
        "schema": {
          "type": [
            "array",
            "string"
          ]
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        }
      },
      "disabled": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "validateTrigger": {
        "schema": {
          "type": [
            "string",
            "array"
          ]
        }
      }
    },
    "eventNames": [
      "on_change"
    ],
    "events": {
      "on_change": {
        "description": "值变化时执行；配置后保持旧行为并覆盖 value/checked.path 的自动回写。",
        "valueContext": "$value",
        "automaticWriteback": "only-when-event-absent",
        "generationConflictWith": [
          "value",
          "checked"
        ]
      }
    },
    "dataModelBinding": {
      "prop": "value",
      "valueTypes": [
        "string",
        "null"
      ]
    }
  },
  "mentions": {
    "component": "mentions",
    "registryNames": [
      "mentions"
    ],
    "documentationSlug": "mentions",
    "allowedProps": [
      "id",
      "component",
      "style",
      "options",
      "prefix",
      "disabled",
      "value",
      "field",
      "rules",
      "validateTrigger",
      "on_change"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "field": {
        "schema": {
          "type": "string"
        },
        "description": "表单校验字段名；不负责替代 value.path。"
      },
      "rules": {
        "schema": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "value": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "on_change": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "options": {
        "schema": {
          "type": [
            "array",
            "string"
          ]
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        }
      },
      "disabled": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "prefix": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "validateTrigger": {
        "schema": {
          "type": [
            "string",
            "array"
          ]
        }
      }
    },
    "eventNames": [
      "on_change"
    ],
    "events": {
      "on_change": {
        "description": "值变化时执行；配置后保持旧行为并覆盖 value/checked.path 的自动回写。",
        "valueContext": "$value",
        "automaticWriteback": "only-when-event-absent",
        "generationConflictWith": [
          "value",
          "checked"
        ]
      }
    },
    "dataModelBinding": {
      "prop": "value",
      "valueTypes": [
        "string",
        "null"
      ]
    }
  },
  "button": {
    "component": "button",
    "registryNames": [
      "button"
    ],
    "documentationSlug": "button",
    "allowedProps": [
      "id",
      "component",
      "style",
      "label",
      "title",
      "color",
      "content",
      "disabled",
      "type",
      "danger",
      "ghost",
      "shape",
      "size",
      "block",
      "children",
      "on_tap"
    ],
    "childrenMode": "component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "label": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        }
      },
      "content": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        },
        "description": "组件显示的文本内容。"
      },
      "disabled": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "on_tap": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "title": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "color": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "type": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "danger": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "ghost": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "shape": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "size": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "block": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "children": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [
      "on_tap"
    ],
    "events": {
      "on_tap": {
        "description": "按钮点击时执行。"
      }
    }
  },
  "calendar": {
    "component": "calendar",
    "registryNames": [
      "calendar"
    ],
    "documentationSlug": "calendar",
    "allowedProps": [
      "id",
      "component",
      "style",
      "fullscreen",
      "mode",
      "disabled",
      "format",
      "value",
      "field",
      "rules",
      "validateTrigger",
      "on_change"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "field": {
        "schema": {
          "type": "string"
        },
        "description": "表单校验字段名；不负责替代 value.path。"
      },
      "rules": {
        "schema": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "value": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "on_change": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "disabled": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "fullscreen": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "mode": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "format": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "validateTrigger": {
        "schema": {
          "type": [
            "string",
            "array"
          ]
        }
      }
    },
    "eventNames": [
      "on_change",
      "on_panel_change"
    ],
    "events": {
      "on_change": {
        "description": "值变化时执行；配置后保持旧行为并覆盖 value/checked.path 的自动回写。",
        "valueContext": "$value",
        "automaticWriteback": "only-when-event-absent",
        "generationConflictWith": [
          "value",
          "checked"
        ]
      },
      "on_panel_change": {
        "description": "面板月份或年份变化时执行。"
      }
    },
    "dataModelBinding": {
      "prop": "value",
      "valueTypes": [
        "string",
        "null"
      ]
    }
  },
  "segmented": {
    "component": "segmented",
    "registryNames": [
      "segmented"
    ],
    "documentationSlug": "segmented",
    "allowedProps": [
      "id",
      "component",
      "style",
      "options",
      "block",
      "disabled",
      "size",
      "value",
      "field",
      "rules",
      "validateTrigger",
      "on_change"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "field": {
        "schema": {
          "type": "string"
        },
        "description": "表单校验字段名；不负责替代 value.path。"
      },
      "rules": {
        "schema": {
          "type": "array",
          "items": {
            "type": "object"
          }
        }
      },
      "value": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "on_change": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "options": {
        "schema": {
          "type": [
            "array",
            "string"
          ]
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        }
      },
      "disabled": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "block": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "size": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "validateTrigger": {
        "schema": {
          "type": [
            "string",
            "array"
          ]
        }
      }
    },
    "eventNames": [
      "on_change"
    ],
    "events": {
      "on_change": {
        "description": "值变化时执行；配置后保持旧行为并覆盖 value/checked.path 的自动回写。",
        "valueContext": "$value",
        "automaticWriteback": "only-when-event-absent",
        "generationConflictWith": [
          "value",
          "checked"
        ]
      }
    },
    "dataModelBinding": {
      "prop": "value",
      "valueTypes": [
        "string",
        "number",
        "boolean",
        "null"
      ]
    }
  },
  "text": {
    "component": "text",
    "registryNames": [
      "text"
    ],
    "documentationSlug": "text",
    "allowedProps": [
      "id",
      "component",
      "style",
      "content",
      "color",
      "title"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "content": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        },
        "description": "组件显示的文本内容。"
      },
      "title": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        }
      },
      "color": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      }
    },
    "eventNames": [],
    "events": {}
  },
  "icon": {
    "component": "icon",
    "registryNames": [
      "icon"
    ],
    "documentationSlug": "icon",
    "allowedProps": [
      "id",
      "component",
      "style",
      "icon",
      "spin",
      "rotate"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "icon": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        }
      },
      "spin": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "rotate": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      }
    },
    "eventNames": [],
    "events": {}
  },
  "typography": {
    "component": "typography",
    "registryNames": [
      "typography"
    ],
    "documentationSlug": "typography",
    "allowedProps": [
      "id",
      "component",
      "style",
      "variant",
      "textType",
      "type",
      "level",
      "disabled",
      "mark",
      "code",
      "keyboard",
      "underline",
      "delete",
      "strong",
      "italic",
      "ellipsis",
      "copyable",
      "href",
      "target",
      "items",
      "children"
    ],
    "childrenMode": "component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "variant": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "textType": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "type": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "level": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "disabled": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "mark": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "code": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "keyboard": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "underline": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "delete": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "strong": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "italic": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "ellipsis": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "copyable": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "href": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "target": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "items": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "children": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [],
    "events": {}
  },
  "alert": {
    "component": "alert",
    "registryNames": [
      "alert"
    ],
    "documentationSlug": "alert",
    "allowedProps": [
      "id",
      "component",
      "style",
      "title",
      "content",
      "message",
      "description",
      "showIcon",
      "status",
      "type",
      "closable",
      "on_close"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "title": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        },
        "description": "组件显示的文本内容。"
      },
      "content": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        },
        "description": "组件显示的文本内容。"
      },
      "message": {
        "schema": {
          "type": "string"
        },
        "deprecated": {
          "replacement": "title",
          "reason": "运行时规范主提示属性为 title 或 content。"
        }
      },
      "description": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        },
        "description": "组件显示的文本内容。"
      },
      "showIcon": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "status": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "type": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "closable": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "on_close": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      }
    },
    "eventNames": [],
    "events": {}
  },
  "tag": {
    "component": "tag",
    "registryNames": [
      "tag"
    ],
    "documentationSlug": "tag",
    "allowedProps": [
      "id",
      "component",
      "style",
      "content",
      "color",
      "bordered"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "content": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        },
        "description": "组件显示的文本内容。"
      },
      "bordered": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "color": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      }
    },
    "eventNames": [],
    "events": {}
  },
  "spin": {
    "component": "spin",
    "registryNames": [
      "spin"
    ],
    "documentationSlug": "spin",
    "allowedProps": [
      "id",
      "component",
      "style",
      "spinning",
      "tip",
      "size",
      "children"
    ],
    "childrenMode": "component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "spinning": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "tip": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        },
        "description": "组件显示的文本内容。"
      },
      "size": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "children": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [],
    "events": {}
  },
  "skeleton": {
    "component": "skeleton",
    "registryNames": [
      "skeleton"
    ],
    "documentationSlug": "skeleton",
    "allowedProps": [
      "id",
      "component",
      "style",
      "loading",
      "visible",
      "active",
      "avatar",
      "paragraph",
      "round",
      "title",
      "skeletonType",
      "shape",
      "block",
      "size",
      "children"
    ],
    "childrenMode": "component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "deprecated": {
          "replacement": "loading",
          "reason": "历史 visible 表示 loading；整体显隐应使用外层 box.visible。"
        }
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "loading": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "default": true
      },
      "active": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "avatar": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "paragraph": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "round": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "title": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "skeletonType": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "shape": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "block": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "size": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "children": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [],
    "events": {},
    "dependencies": [
      {
        "when": "skeletonType",
        "forbids": [
          "children",
          "loading",
          "visible"
        ],
        "message": "独立骨架形态不渲染 children，不能配置 loading。"
      }
    ],
    "deprecated": {
      "visible": {
        "replacement": "loading",
        "reason": "历史 visible 表示 loading；整体显隐应使用外层 box.visible。"
      }
    }
  },
  "progress": {
    "component": "progress",
    "registryNames": [
      "progress"
    ],
    "documentationSlug": "progress",
    "allowedProps": [
      "id",
      "component",
      "style",
      "percent",
      "status",
      "size"
    ],
    "childrenMode": "none",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "percent": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "status": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "size": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      }
    },
    "eventNames": [],
    "events": {}
  },
  "modal": {
    "component": "modal",
    "registryNames": [
      "modal"
    ],
    "documentationSlug": "modal",
    "allowedProps": [
      "id",
      "component",
      "style",
      "open",
      "title",
      "cancelText",
      "okText",
      "okType",
      "footer",
      "width",
      "centered",
      "closable",
      "destroyOnHidden",
      "keyboard",
      "mask",
      "maskClosable",
      "zIndex",
      "on_ok",
      "on_cancel",
      "children"
    ],
    "childrenMode": "component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "open": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "title": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "cancelText": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "okText": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "okType": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "footer": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "width": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "centered": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "closable": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "destroyOnHidden": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "keyboard": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "mask": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "maskClosable": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "zIndex": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "on_ok": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "on_cancel": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "children": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [
      "on_ok",
      "on_cancel"
    ],
    "events": {
      "on_ok": {
        "description": "确认按钮动作。"
      },
      "on_cancel": {
        "description": "取消或关闭动作。"
      }
    }
  },
  "drawer": {
    "component": "drawer",
    "registryNames": [
      "drawer"
    ],
    "documentationSlug": "drawer",
    "allowedProps": [
      "id",
      "component",
      "style",
      "open",
      "title",
      "placement",
      "width",
      "height",
      "closable",
      "destroyOnHidden",
      "keyboard",
      "mask",
      "maskClosable",
      "zIndex",
      "extra",
      "footer",
      "on_close",
      "children"
    ],
    "childrenMode": "component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "open": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "title": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "placement": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "width": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "height": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "closable": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "destroyOnHidden": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "keyboard": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "mask": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "maskClosable": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "zIndex": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "extra": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "footer": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "on_close": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "children": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [
      "on_close"
    ],
    "events": {
      "on_close": {
        "description": "抽屉关闭动作。"
      }
    }
  },
  "tooltip": {
    "component": "tooltip",
    "registryNames": [
      "tooltip"
    ],
    "documentationSlug": "tooltip",
    "allowedProps": [
      "id",
      "component",
      "style",
      "title",
      "placement",
      "trigger",
      "open",
      "on_open_change",
      "arrow",
      "color",
      "children"
    ],
    "childrenMode": "trigger-component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "title": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        },
        "description": "组件显示的文本内容。"
      },
      "open": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "placement": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "trigger": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "on_open_change": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "arrow": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "color": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "children": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [
      "on_open_change"
    ],
    "events": {
      "on_open_change": {
        "description": "受控开关变化动作。"
      }
    }
  },
  "popover": {
    "component": "popover",
    "registryNames": [
      "popover"
    ],
    "documentationSlug": "popover",
    "allowedProps": [
      "id",
      "component",
      "style",
      "title",
      "content",
      "placement",
      "trigger",
      "open",
      "on_open_change",
      "arrow",
      "children"
    ],
    "childrenMode": "trigger-component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "title": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        },
        "description": "组件显示的文本内容。"
      },
      "content": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        },
        "description": "组件显示的文本内容。"
      },
      "open": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "path"
          ],
          "pathScope": "root-or-repeater-relative"
        }
      },
      "placement": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "trigger": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "on_open_change": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "arrow": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "children": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [
      "on_open_change"
    ],
    "events": {
      "on_open_change": {
        "description": "受控开关变化动作。"
      }
    }
  },
  "popconfirm": {
    "component": "popconfirm",
    "registryNames": [
      "popconfirm"
    ],
    "documentationSlug": "popconfirm",
    "allowedProps": [
      "id",
      "component",
      "style",
      "title",
      "description",
      "okText",
      "cancelText",
      "okType",
      "placement",
      "disabled",
      "on_confirm",
      "on_cancel",
      "children"
    ],
    "childrenMode": "trigger-component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "title": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        },
        "description": "组件显示的文本内容。"
      },
      "description": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        },
        "description": "组件显示的文本内容。"
      },
      "disabled": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        }
      },
      "okText": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "cancelText": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "okType": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "placement": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "on_confirm": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "on_cancel": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        }
      },
      "children": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [
      "on_confirm",
      "on_cancel"
    ],
    "events": {
      "on_confirm": {
        "description": "确认动作。"
      },
      "on_cancel": {
        "description": "取消动作。"
      }
    }
  },
  "condition": {
    "component": "condition",
    "registryNames": [
      "condition"
    ],
    "documentationSlug": "condition",
    "allowedProps": [
      "id",
      "component",
      "style",
      "when",
      "then",
      "else",
      "match",
      "cases",
      "default"
    ],
    "childrenMode": "branch-component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "when": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "判断模式条件。"
      },
      "match": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "null"
          ]
        },
        "bindings": {
          "accepts": [
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "匹配模式表达式或静态值。"
      },
      "then": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "else": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "cases": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "default": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [],
    "events": {},
    "dependencies": [
      {
        "requires": "then",
        "when": "when",
        "forbids": [
          "match",
          "cases"
        ],
        "message": "when 模式需要 then，且不能与 match 模式混用。"
      },
      {
        "requires": "cases",
        "when": "match",
        "forbids": [
          "when",
          "then",
          "else"
        ],
        "message": "match 模式需要 cases，且不能与 when 模式混用。"
      },
      {
        "when": "else",
        "forbids": [
          "default"
        ],
        "message": "when 模式的 else 与 default 最多选择一个。"
      },
      {
        "when": "default",
        "forbids": [
          "else"
        ],
        "message": "when 模式的 else 与 default 最多选择一个。"
      }
    ]
  },
  "repeater": {
    "component": "repeater",
    "registryNames": [
      "repeater"
    ],
    "documentationSlug": "repeater",
    "allowedProps": [
      "id",
      "component",
      "style",
      "data",
      "direction",
      "gap",
      "emptyContent",
      "keyField",
      "children"
    ],
    "childrenMode": "template-component-ids",
    "properties": {
      "id": {
        "schema": {
          "type": "string"
        },
        "description": "在 schema 中唯一的组件 ID。"
      },
      "component": {
        "schema": {
          "type": "string"
        },
        "description": "Form Registry 注册名。"
      },
      "name": {
        "schema": {
          "type": "string"
        }
      },
      "domId": {
        "schema": {
          "type": "string"
        }
      },
      "style": {
        "schema": {
          "type": "object",
          "additionalProperties": {
            "type": [
              "string",
              "number"
            ]
          }
        }
      },
      "className": {
        "schema": {
          "type": "string"
        }
      },
      "animation": {
        "schema": {
          "type": "object"
        }
      },
      "visible": {
        "schema": {
          "type": "boolean"
        },
        "bindings": {
          "accepts": [
            "boolean",
            "expression",
            "path"
          ],
          "pathScope": "root-or-repeater-relative",
          "expressionMode": "pure"
        },
        "description": "控制组件是否渲染。"
      },
      "on_mount": {
        "schema": {
          "type": [
            "object",
            "array"
          ]
        },
        "description": "组件挂载时执行的 Action。"
      },
      "data": {
        "schema": {
          "type": "object",
          "properties": {
            "path": {
              "type": "string"
            }
          },
          "required": [
            "path"
          ],
          "additionalProperties": false
        },
        "bindings": {
          "accepts": [
            "path"
          ],
          "pathScope": "root"
        }
      },
      "emptyContent": {
        "schema": {
          "type": "string"
        },
        "bindings": {
          "accepts": [
            "expression"
          ],
          "expressionMode": "interpolation"
        },
        "description": "组件显示的文本内容。"
      },
      "direction": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "gap": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "keyField": {
        "schema": {
          "type": [
            "string",
            "number",
            "boolean",
            "object",
            "array",
            "null"
          ]
        }
      },
      "children": {
        "schema": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      }
    },
    "eventNames": [],
    "events": {},
    "dataModelBinding": {
      "prop": "data",
      "valueTypes": [
        "array"
      ]
    },
    "notes": [
      "data.path 使用根路径；模板子组件的可回写绑定可使用 ./field。"
    ]
  }
} as const;
export const FORM_SCHEMA_CONTRACT = {
  "edition": "form",
  "activity": {
    "type": "ACTIVITY_SNAPSHOT",
    "content": {
      "required": [
        "components",
        "dataModel"
      ],
      "components": {
        "type": "array",
        "itemRef": "formComponentContracts"
      },
      "dataModel": {
        "type": "object"
      }
    }
  },
  "componentGraph": {
    "rootId": "root",
    "componentsAreFlat": true,
    "idsUnique": true,
    "eachComponentReferencedOnce": true,
    "acyclic": true,
    "branchReferences": [
      "then",
      "else",
      "cases",
      "default"
    ],
    "repeaterTemplateReferences": "children belong to repeater and repeat per data item"
  },
  "paths": {
    "bindingObject": {
      "exactKeys": [
        "path"
      ],
      "nonEmpty": true
    },
    "root": {
      "prefix": "/",
      "description": "JSON data model root path."
    },
    "repeaterRelative": {
      "prefix": "./",
      "allowedOnlyIn": [
        "repeater.children"
      ]
    },
    "forbidden": [
      "/",
      "./"
    ],
    "pointerEscapes": {
      "supportedByRuntime": true,
      "generationRecommendation": "avoid field names containing / or ~"
    },
    "expressionCannotContainPathObject": true
  },
  "expressions": {
    "pureContexts": [
      "$root",
      "$current",
      "$parent"
    ],
    "actionContexts": [
      "$root",
      "$current",
      "$parent",
      "$value"
    ],
    "recommended": [
      "${$root.field}",
      "${!$root.field}",
      "${$root.status === 'approved'}",
      "${$current.enabled}"
    ],
    "forbiddenRecommendations": [
      "${field}",
      "${value}",
      "${fileList}",
      "{ not: ... }"
    ]
  },
  "condition": {
    "modes": {
      "when": {
        "required": [
          "when",
          "then"
        ],
        "optional": [
          "else",
          "default"
        ],
        "mutuallyExclusive": [
          "match",
          "cases"
        ]
      },
      "match": {
        "required": [
          "match",
          "cases"
        ],
        "optional": [
          "default"
        ],
        "mutuallyExclusive": [
          "when",
          "then",
          "else"
        ]
      }
    },
    "matchKeyTypes": [
      "string",
      "number",
      "boolean",
      "null"
    ]
  },
  "events": {
    "onChange": {
      "automaticWriteback": "only-when-event-absent",
      "valueContext": "$value",
      "strictMode": "warning"
    }
  },
  "skeleton": {
    "loadingDefault": true,
    "loadingProperty": "loading",
    "deprecatedAlias": "visible",
    "visibilityWrapper": "box.visible"
  },
  "strictMode": {
    "unknownProps": "error",
    "invalidBindings": "error",
    "onChangeWritebackConflict": "warning",
    "runtimeRemainsBackwardCompatible": true
  }
} as const;
