import { CreateCommentController } from '@/presentation/controllers/comment'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeCreateCommentValidation } from '@/main/factories/validations/comment'
import { makeCreateComment } from '@/main/factories/usecases/comment'

export const makeCreateCommentController = (): Controller => {
  const createCommentController = new CreateCommentController(makeCreateCommentValidation(), makeCreateComment())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(createCommentController, createLogErrorRepository)
}
