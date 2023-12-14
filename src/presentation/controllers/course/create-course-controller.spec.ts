import { MissingParamError, ServerError } from '@/presentation/errors'
import { CreateCourseController } from './create-course-controller'
import { HttpRequest, Validation } from '@/presentation/protocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http'
import { ICreateCourse } from '@/domain/usecases/course'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    description: 'any_description',
    thumb: 'any_thumb',
    author: 'any_author'
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeCreateCourse = (): ICreateCourse => {
  class CreateCourseStub implements ICreateCourse {
    async create (data: ICreateCourse.Params): Promise<void> {}
  }
  return new CreateCourseStub()
}

interface SutTypes {
  sut: CreateCourseController
  validationStub: Validation
  createCourseStub: ICreateCourse
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const createCourseStub = makeCreateCourse()
  const sut = new CreateCourseController(validationStub, createCourseStub)
  return {
    sut,
    validationStub,
    createCourseStub
  }
}

describe('CreateCourseController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const createSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith({
      name: 'any_name',
      description: 'any_description',
      thumb: 'any_thumb',
      author: 'any_author'
    })
  })

  test('Should return 400 if Validation returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call ICreateCourse with correct values', async () => {
    const { sut, createCourseStub } = makeSut()
    const createSpy = jest.spyOn(createCourseStub, 'create')
    const httpRequest = makeFakeRequest()
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if ICreateCourse throws', async () => {
    const { sut, createCourseStub } = makeSut()
    jest.spyOn(createCourseStub, 'create').mockImplementationOnce(async () => {
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
