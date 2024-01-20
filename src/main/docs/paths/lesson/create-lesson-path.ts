export const createLessonPath = {
  post: {
    tags: ['Lesson'],
    summary: 'API para criar aula',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/createLessonParams'
          }
        }
      }
    },
    responses: {
      201: {
        description: 'Criado',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/createLessonResult'
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
