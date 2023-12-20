import { MissingParamError, ServerError } from '@/presentation/errors'
import { GetAllCommentsByLessonController } from './get-all-comments-by-lesson-controller'
import { HttpRequest, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers/http'
import { IGetAllCommentsByLesson } from '@/domain/usecases/comment'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    lessonId: 'any_lesson_id'
  },
  query: {
    take: 'any_take',
    skip: 'any_skip'
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

const makeGetAllCommentsByLesson = (): IGetAllCommentsByLesson => {
  class GetAllCommentsByLessonStub implements IGetAllCommentsByLesson {
    async getAll (data: IGetAllCommentsByLesson.Params): Promise<any> {
      return {
        id: 'any',
        comment: 'any_comment'
      }
    }
  }
  return new GetAllCommentsByLessonStub()
}

interface SutTypes {
  sut: GetAllCommentsByLessonController
  validationStub: Validation
  getAllCommentsByLessonStub: IGetAllCommentsByLesson
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const getAllCommentsByLessonStub = makeGetAllCommentsByLesson()
  const sut = new GetAllCommentsByLessonController(validationStub, getAllCommentsByLessonStub)
  return {
    sut,
    validationStub,
    getAllCommentsByLessonStub
  }
}

describe('GetAllCommentsByLessonController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const createSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith({
      lessonId: 'any_lesson_id',
      take: 'any_take',
      skip: 'any_skip'
    })
  })

  test('Should call IGetAllCommentsByLesson with correct values', async () => {
    const { sut, getAllCommentsByLessonStub } = makeSut()
    const createSpy = jest.spyOn(getAllCommentsByLessonStub, 'getAll')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith({
      skip: 'any_skip',
      take: 'any_take',
      lessonId: 'any_lesson_id'
    })
  })

  test('Should return 400 if Validation returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should return 500 if IGetAllCommentsByLesson throws', async () => {
    const { sut, getAllCommentsByLessonStub } = makeSut()
    jest.spyOn(getAllCommentsByLessonStub, 'getAll').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('any_error')))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({
      id: 'any',
      comment: 'any_comment'
    }))
  })
})
