import { CreateCommentController } from '@/presentation/controllers/comment'
import { CreateComment } from '@/data/usecases/comment'
import { CreateCommentRepository } from '@/infra/db/repositories/comment'
import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'
import { makeCreateCommentValidation } from './validations'

export const makeCreateCommentController = (): Controller => {
  const createCommentRepository = new CreateCommentRepository()
  const createComment = new CreateComment(createCommentRepository)
  const createCommentController = new CreateCommentController(createComment, makeCreateCommentValidation())
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(createCommentController, createLogErrorRepository)
}
