import { Router } from 'express'
import { makeCreateUserController, makeUserAuthenticationController, makeUpdateUserController, makeDeleteUserController } from '../factories/controllers/user'
import { adaptRoute } from '../adapters/express'

export default (router: Router): void => {
  router.post('/user', adaptRoute(makeCreateUserController()))
  router.post('/user/authentication', adaptRoute(makeUserAuthenticationController()))
  router.put('/user/:id', adaptRoute(makeUpdateUserController()))
  router.delete('/user/:id', adaptRoute(makeDeleteUserController()))
}
