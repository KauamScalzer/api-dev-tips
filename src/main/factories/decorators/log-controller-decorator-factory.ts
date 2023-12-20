import { CreateLogErrorRepository } from '@/infra/db/repositories/log-error'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const createLogErrorRepository = new CreateLogErrorRepository()
  return new LogControllerDecorator(controller, createLogErrorRepository)
}
