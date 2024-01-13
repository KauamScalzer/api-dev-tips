export const createCommentPath = {
  post: {
    tags: ['Comment'],
    summary: 'API para criar comentário',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/createCommentParams'
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
              $ref: '#/schemas/createCommentResult'
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
