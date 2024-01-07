export const updateUserParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    }
  },
  required: ['name', 'email']
}
