export const createCommentResultSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number'
    },
    comment: {
      type: 'string'
    },
    lessonId: {
      type: 'number'
    },
    userId: {
      type: 'number'
    },
    createdAt: {
      type: 'string'
    },
    updatedAt: {
      type: 'string'
    }
  }
}
