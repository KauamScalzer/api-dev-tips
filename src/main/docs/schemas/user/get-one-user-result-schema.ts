export const getOneUserResultSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number'
    },
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    createdAt: {
      type: 'string'
    },
    updatedAt: {
      type: 'string'
    }
  }
}
