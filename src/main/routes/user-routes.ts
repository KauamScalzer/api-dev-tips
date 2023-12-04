import { Router } from 'express'
import { makeCreateUserController, makeUserAuthenticationController, makeUpdateUserController } from '../factories/controllers/user'
import { adaptRoute } from '../adapters/express'

export default (router: Router): void => {
  router.post('/user', adaptRoute(makeCreateUserController()))
  router.post('/user/authentication', adaptRoute(makeUserAuthenticationController()))
  router.put('/user/:id', adaptRoute(makeUpdateUserController()))
}
