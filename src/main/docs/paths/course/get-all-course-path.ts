export const getAllCoursePath = {
  get: {
    tags: ['Course'],
    summary: 'API para listar todos os cursos',
    parameters: [{
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
              $ref: '#/schemas/getAllCourseResult'
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
