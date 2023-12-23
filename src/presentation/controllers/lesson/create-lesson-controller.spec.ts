import { CreateLessonController } from './create-lesson-controller'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'
import { serverError, noContent, badRequest } from '@/presentation/helpers/http'
import { ICreateLesson } from '@/domain/usecases/lesson'

const makeCreateLesson = (): ICreateLesson => {
  class CreateLessonStub implements ICreateLesson {
    async create (data: ICreateLesson.Params): Promise<void> {}
  }
  return new CreateLessonStub()
}

const makeFakeRequest = (): CreateLessonController.Params => ({
  courseId: 1,
  name: 'any_name',
  description: 'any_description',
  urlVideo: 'any_url_video'
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
  sut: CreateLessonController
  createLessonStub: ICreateLesson
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const createLessonStub = makeCreateLesson()
  const validationStub = makeValidation()
  const sut = new CreateLessonController(validationStub, createLessonStub)
  return {
    sut,
    createLessonStub,
    validationStub
  }
}

describe('CreateLessonController', () => {
  test('Should call ICreateLesson with correct values', async () => {
    const { sut, createLessonStub } = makeSut()
    const createSpy = jest.spyOn(createLessonStub, 'create')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith({
      courseId: 1,
      name: 'any_name',
      description: 'any_description',
      urlVideo: 'any_url_video'
    })
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return 500 if ICreateLesson throws', async () => {
    const { sut, createLessonStub } = makeSut()
    jest.spyOn(createLessonStub, 'create').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('any_error')))
  })

  test('Should return 400 if Validation returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should return 204 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
