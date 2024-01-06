export const userPath = {
  post: {
    tags: ['User'],
    summary: 'API para criar usuário',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/createUserParams'
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
              $ref: '#/schemas/user'
            }
          }
        }
      },
      400: {
        description: 'Bad '
      }
    }
  }
}
