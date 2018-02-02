
const userSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'User name',
    },
    surname: {
      type: 'string',
      description: 'User Surname',
    },
    code: {
      type: 'string',
      description: 'User Surname',
    },
    email: {
      type: 'string',
      description: 'User email',
    },
    grade: {
      type: 'string',
      description: 'User grade',
    },
    faculty: {
      type: 'string',
      description: 'User faculty',
    },
    roles: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Role name',
          },
          description: {
            type: 'string',
            description: 'Role description',
          },
        },
      },
    },
    permissions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Role name',
          },
          description: {
            type: 'string',
            description: 'Role description',
          },
        },
      },
    },
  },
  required: [
    'name',
    'surname',
    'code',
  ],
  additionalProperties: false,
};

module.exports = {
  userSchema,
};
