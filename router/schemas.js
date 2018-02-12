
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
        type: 'string',
        description: 'Role',
      },
    },
    permissions: {
      type: 'array',
      items: {
        type: 'string',
        description: 'Permission',
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

const updateUserSchema = Object.assign(
  {},
  userSchema,
  {
    required: [],
  },
);

module.exports = {
  userSchema,
  updateUserSchema,
};
