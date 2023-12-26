import { CreateUserController } from './create-user-controller'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'
import { ICreateUser } from '@/domain/usecases/user'
import { serverError, badRequest, created } from '@/presentation/helpers/http'

const makeCreateUser = (): ICreateUser => {
  class CreateUserStub implements ICreateUser {
    async create (data: ICreateUser.Params): Promise<string> {
      return await new Promise(resolve => resolve(makeFakeUserReturn()))
    }
  }
  return new CreateUserStub()
}

const makeFakeUserReturn = (): string => ('any_token')

const makeFakeRequest = (): CreateUserController.Params => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  passwordConfirmation: 'any_password',
  urlImage: 'any_url_image'
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: CreateUserController
  createUserStub: ICreateUser
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const createUserStub = makeCreateUser()
  const validationStub = makeValidation()
  const sut = new CreateUserController(validationStub, createUserStub)
  return {
    sut,
    createUserStub,
    validationStub
  }
}

describe('SignUp Controller', () => {
  test('Should call ICreateUser with correct values', async () => {
    const { sut, createUserStub } = makeSut()
    const createSpy = jest.spyOn(createUserStub, 'create')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      urlImage: 'any_url_image'
    })
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return 500 if ICreateUser throws', async () => {
    const { sut, createUserStub } = makeSut()
    jest.spyOn(createUserStub, 'create').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('any_error')))
  })

  test('Should return 201 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(created({ accessToken: makeFakeUserReturn() }))
  })

  test('Should return 400 if Validation returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
