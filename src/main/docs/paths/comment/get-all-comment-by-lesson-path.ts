export const getAllCommentByLessonPath = {
  get: {
    tags: ['Comment'],
    summary: 'API para listar comentários por curso',
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
              $ref: '#/schemas/getAllCommentByLessonResult'
            }
          }
        }
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
