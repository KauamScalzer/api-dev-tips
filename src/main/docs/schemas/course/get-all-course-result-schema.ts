import { createCourseResultSchema } from './create-course-result-schema'

export const getAllCourseResultSchema = {
  type: 'object',
  properties: {
    result: {
      type: 'array',
      items: createCourseResultSchema
    },
    count: {
      type: 'number'
    }
  }
}
