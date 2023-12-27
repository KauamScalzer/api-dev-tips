import { MissingParamError, ServerError } from '@/presentation/errors'
import { GetAllLessonByCourseController } from './get-all-lesson-by-course-controller'
import { Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { IGetAllLessonByCourse } from '@/domain/usecases/lesson'

const makeFakeRequest = (): GetAllLessonByCourseController.Params => ({
  courseId: 1,
  skip: 1,
  take: 1
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeGetAllLessonByCourse = (): IGetAllLessonByCourse => {
  class GetAllLessonByCourseStub implements IGetAllLessonByCourse {
    async getAll (data: IGetAllLessonByCourse.Params): Promise<IGetAllLessonByCourse.Result> {
      return makeLesson()
    }
  }
  return new GetAllLessonByCourseStub()
}

const makeLesson = (): IGetAllLessonByCourse.Result => ({
  result: [{
    id: 1,
    courseId: 1,
    name: 'any_name',
    description: 'any_description',
    urlVideo: 'any_url_video',
    createdAt: new Date(),
    updatedAt: new Date()
  }],
  count: 1
})

interface SutTypes {
  sut: GetAllLessonByCourseController
  validationStub: Validation
  getAllLessonByCourseStub: IGetAllLessonByCourse
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const getAllLessonByCourseStub = makeGetAllLessonByCourse()
  const sut = new GetAllLessonByCourseController(validationStub, getAllLessonByCourseStub)
  return {
    sut,
    validationStub,
    getAllLessonByCourseStub
  }
}

describe('GetAllLessonByCourseController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const createSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should return 400 if Validation returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call IGetAllLessonByCourse with correct values', async () => {
    const { sut, getAllLessonByCourseStub } = makeSut()
    const createSpy = jest.spyOn(getAllLessonByCourseStub, 'getAll')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should return 500 if IGetAllLessonByCourse throws', async () => {
    const { sut, getAllLessonByCourseStub } = makeSut()
    jest.spyOn(getAllLessonByCourseStub, 'getAll').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('any_error')))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeLesson()))
  })
})
