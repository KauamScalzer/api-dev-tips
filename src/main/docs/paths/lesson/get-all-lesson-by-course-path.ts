export const getAllLessonByCoursePath = {
  get: {
    tags: ['Lesson'],
    summary: 'API para listar todos as aulas por curso',
    parameters: [{
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'number'
      }
    },
    {
      in: 'query',
      name: 'skip',
      required: true,
      schema: {
        type: 'number'
      }
    },
    {
      in: 'query',
      name: 'take',
      required: true,
      schema: {
        type: 'number'
      }
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/getAllLessonByCourseResult'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
