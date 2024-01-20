export const createLessonParamsSchema = {
  type: 'object',
  properties: {
    lessonId: {
      type: 'number'
    },
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    urlVideo: {
      type: 'string'
    }
  },
  required: ['lessonId', 'name', 'description', 'urlVideo']
}
