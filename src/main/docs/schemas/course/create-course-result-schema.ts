export const createCourseResultSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number'
    },
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
    },
    createdAt: {
      type: 'string'
    },
    updatedAt: {
      type: 'string'
    }
  }
}
