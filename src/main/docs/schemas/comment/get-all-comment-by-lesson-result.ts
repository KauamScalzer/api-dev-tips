import { createCommentResultSchema } from '.'

export const getAllCommentByLessonResultSchema = {
  type: 'object',
  properties: {
    result: {
      type: 'array',
      items: createCommentResultSchema
    },
    count: {
      type: 'number'
    }
  }
}
