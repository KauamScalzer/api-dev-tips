import { MissingParamError, ServerError } from '@/presentation/errors'
import { CreateUserCoursesController } from './create-user-courses-controller'
import { Validation } from '@/presentation/protocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http'
import { ICreateUserCourses, CreateUserCoursesParams } from '@/domain/usecases/user-course'

const makeFakeRequest = (): CreateUserCoursesController.Params => ({
  userId: 1,
  courseIds: [
    {
      id: 1
    }
  ]
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeCreateUserCourses = (): ICreateUserCourses => {
  class CreateUserCoursesStub implements ICreateUserCourses {
    async create (data: CreateUserCoursesParams): Promise<void> {}
  }
  return new CreateUserCoursesStub()
}

interface SutTypes {
  sut: CreateUserCoursesController
  validationStub: Validation
  createUserCoursesStub: ICreateUserCourses
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const createUserCoursesStub = makeCreateUserCourses()
  const sut = new CreateUserCoursesController(validationStub, createUserCoursesStub)
  return {
    sut,
    validationStub,
    createUserCoursesStub
  }
}

describe('CreateUserCoursesController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const createSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith({
      userId: 1,
      courseIds: [
        {
          id: 1
        }
      ]
    })
  })

  test('Should return 400 if Validation returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call ICreateUserCourses with correct values', async () => {
    const { sut, createUserCoursesStub } = makeSut()
    const createSpy = jest.spyOn(createUserCoursesStub, 'create')
    const httpRequest = makeFakeRequest()
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return 500 if ICreateCourse throws', async () => {
    const { sut, createUserCoursesStub } = makeSut()
    jest.spyOn(createUserCoursesStub, 'create').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('any_error')))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
