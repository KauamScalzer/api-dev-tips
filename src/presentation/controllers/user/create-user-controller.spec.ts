import { CreateUserController } from './create-user-controller'
import { MissingParamError, ServerError } from '../../errors'
import { HttpRequest } from '../../protocols'
import { ICreateUserUsecase, CreateUserModel } from '../../../domain/usecases/user'
import { UserModel } from '../../../domain/models'
import { ok, serverError, badRequest } from '../../helpers/http'
import { Validation } from '../../helpers/validators'

const makeCreateUserUsecase = (): ICreateUserUsecase => {
  class CreateUserUsecaseStub implements ICreateUserUsecase {
    async create (data: CreateUserModel): Promise<UserModel> {
      return await new Promise(resolve => resolve(makeFakeUser()))
    }
  }
  return new CreateUserUsecaseStub()
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

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): Error | undefined {
      return undefined
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: CreateUserController
  createUserUsecase: ICreateUserUsecase
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const createUserUsecase = makeCreateUserUsecase()
  const validationStub = makeValidation()
  const sut = new CreateUserController(createUserUsecase, validationStub)
  return {
    sut,
    createUserUsecase,
    validationStub
  }
}

describe('SignUp Controller', () => {
  test('Should call ICreateUserUsecase with correct values', async () => {
    const { sut, createUserUsecase } = makeSut()
    const createSpy = jest.spyOn(createUserUsecase, 'create')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if ICreateUserUsecase throws', async () => {
    const { sut, createUserUsecase } = makeSut()
    jest.spyOn(createUserUsecase, 'create').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('')))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeUser()))
  })

  test('Should return 400 if Validation returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
