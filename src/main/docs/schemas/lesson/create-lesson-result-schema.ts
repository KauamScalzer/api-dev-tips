export const createLessonResultSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number'
    },
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
    },
    createdAt: {
      type: 'string'
    },
    updatedAt: {
      type: 'string'
    }
  }
}
