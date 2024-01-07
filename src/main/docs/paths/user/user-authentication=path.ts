export const userAuthenticationPath = {
  post: {
    tags: ['User'],
    summary: 'API para authenticar usuário',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/userAuthenticationParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/createUserResult'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
