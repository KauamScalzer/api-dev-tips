import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log-controller-decorator'
import { serverError, ok } from '../../presentation/helpers/http'
import { ICreateLogErrorRepository } from '../../data/protocols/log-error'
import { UserModel } from '../../domain/models'

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return await new Promise(resolve => resolve(ok(makeFakeUser())))
    }
  }
  return new ControllerStub()
}

const makeCreateLogErrorRepository = (): ICreateLogErrorRepository => {
  class CreateLogErrorRepositoryStub implements ICreateLogErrorRepository {
    async create (data: string): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new CreateLogErrorRepositoryStub()
}

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
  createLogErrorRepositoryStub: ICreateLogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const createLogErrorRepositoryStub = makeCreateLogErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, createLogErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    createLogErrorRepositoryStub
  }
}

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const makeFakeUser = (): UserModel => ({
  id: 1,
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

describe('LogControllerDecorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSPy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makeFakeRequest())
    expect(handleSPy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const result = await sut.handle(makeFakeRequest())
    expect(result).toEqual(ok(makeFakeUser()))
  })

  test('Should call ICreateLogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, createLogErrorRepositoryStub } = makeSut()
    const logSpy = jest.spyOn(createLogErrorRepositoryStub, 'create')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(makeFakeServerError())))
    await sut.handle(makeFakeRequest())
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
