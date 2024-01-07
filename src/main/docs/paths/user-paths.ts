export const userPaths = {
  put: {
    tags: ['User'],
    summary: 'API para editar usuário',
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
            $ref: '#/schemas/updateUserParams'
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
      409: {
        $ref: '#/components/conflict'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  delete: {
    tags: ['User'],
    summary: 'API para deletar usuário',
    parameters: [{
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        type: 'number'
      }
    }],
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
  },
  get: {
    tags: ['User'],
    summary: 'API para trazer dados de um usuário',
    parameters: [{
      in: 'path',
      name: 'id',
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
              $ref: '#/schemas/getOneUserResult'
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
