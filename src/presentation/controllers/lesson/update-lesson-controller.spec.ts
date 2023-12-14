import { UpdateLessonController } from './update-lesson-controller'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { HttpRequest, Validation } from '@/presentation/protocols'
import { serverError, noContent, badRequest } from '@/presentation/helpers/http'
import { IUpdateLesson } from '@/domain/usecases/lesson'

const makeUpdateLesson = (): IUpdateLesson => {
  class UpdateLessonStub implements IUpdateLesson {
    async update (data: IUpdateLesson.Params): Promise<void> {}
  }
  return new UpdateLessonStub()
}

const makeFakeRequest = (): HttpRequest => ({
  params: {
    id: 1
  },
  body: {
    courseId: 1,
    name: 'any_name',
    description: 'any_description',
    urlVideo: 'any_url_video'
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

interface SutTypes {
  sut: UpdateLessonController
  updateLessonStub: IUpdateLesson
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const updateLessonStub = makeUpdateLesson()
  const validationStub = makeValidation()
  const sut = new UpdateLessonController(validationStub, updateLessonStub)
  return {
    sut,
    updateLessonStub,
    validationStub
  }
}

describe('UpdateLessonController', () => {
  test('Should call IUpdateLesson with correct values', async () => {
    const { sut, updateLessonStub } = makeSut()
    const createSpy = jest.spyOn(updateLessonStub, 'update')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith({
      id: 1,
      courseId: 1,
      name: 'any_name',
      description: 'any_description',
      urlVideo: 'any_url_video'
    })
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith({
      id: 1,
      courseId: 1,
      name: 'any_name',
      description: 'any_description',
      urlVideo: 'any_url_video'
    })
  })

  test('Should return 500 if IUpdateLesson throws', async () => {
    const { sut, updateLessonStub } = makeSut()
    jest.spyOn(updateLessonStub, 'update').mockImplementationOnce(async () => {
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
