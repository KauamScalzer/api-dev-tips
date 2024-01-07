export const createCourseParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    author: {
      type: 'string'
    },
    thumb: {
      type: 'string'
    }
  },
  required: ['name', 'description', 'author', 'thumb']
}
