import { createLessonResultSchema } from './create-lesson-result-schema'

export const getAllLessonByCourseResultSchema = {
  type: 'object',
  properties: {
    result: {
      type: 'array',
      items: createLessonResultSchema
    },
    count: {
      type: 'number'
    }
  }
}
