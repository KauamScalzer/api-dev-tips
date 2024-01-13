export const createCommentParamsSchema = {
  type: 'object',
  properties: {
    lessonId: {
      type: 'number'
    },
    userId: {
      type: 'number'
    },
    comment: {
      type: 'string'
    }
  },
  required: ['lessonId', 'userId', 'comment']
}
