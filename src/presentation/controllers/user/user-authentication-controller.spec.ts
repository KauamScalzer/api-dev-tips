import { UserAuthenticationController } from './user-authentication-controller'
import { badRequest, serverError, unauthorized, ok } from '@/presentation/helpers'
import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'
import { IUserAuthentication } from '@/domain/usecases/user'

const makeUserAuthentication = (): IUserAuthentication => {
  class UserAuthenticationStub implements IUserAuthentication {
    async auth (data: IUserAuthentication.Params): Promise<string> {
      return await new Promise(resolve => resolve('any_token'))
    }
  }
  return new UserAuthenticationStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: UserAuthenticationController
  userAuthenticationStub: IUserAuthentication
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const userAuthenticationStub = makeUserAuthentication()
  const validationStub = makeValidation()
  const sut = new UserAuthenticationController(validationStub, userAuthenticationStub)
  return {
    sut,
    userAuthenticationStub,
    validationStub
  }
}

const makeFakeRequest = (): UserAuthenticationController.Params => ({
  password: 'any_password',
  email: 'any_mail@mail.com'
})

describe('UserAuthenticationController', () => {
  test('Should call IUserAuthentication with correct values', async () => {
    const { sut, userAuthenticationStub } = makeSut()
    const authSpy = jest.spyOn(userAuthenticationStub, 'auth')
    await sut.handle(makeFakeRequest())
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_mail@mail.com',
      password: 'any_password'
    })
  })

  test('Should return 500 if IUserAuthentication throws', async () => {
    const { sut, userAuthenticationStub } = makeSut()
    jest.spyOn(userAuthenticationStub, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(serverError(new Error('any_error')))
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, userAuthenticationStub } = makeSut()
    jest.spyOn(userAuthenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(unauthorized())
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(ok({ accessToken: 'any_token' }))
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return 400 if Validation returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
