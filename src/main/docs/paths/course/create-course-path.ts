export const createCoursePath = {
  post: {
    tags: ['Course'],
    summary: 'API para criar curso',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/createCourseParams'
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
              $ref: '#/schemas/createCourseResult'
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
