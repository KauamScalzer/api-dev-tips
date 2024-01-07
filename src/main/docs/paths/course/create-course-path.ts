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
        description: 'Criado'
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
