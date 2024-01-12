export const coursePaths = {
  put: {
    tags: ['Course'],
    summary: 'API para editar curso',
    parameters: [{
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'number'
      }
    }],
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
      204: {
        description: 'Sucesso'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
