import { CreateCommentController } from './create-comment-controller'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'
import { serverError, badRequest, returnErrorDecider, created } from '@/presentation/helpers'
import { ICreateComment } from '@/domain/usecases/comment'

jest.mock('@/presentation/helpers')

const makeCreateComment = (): ICreateComment => {
  class CreateCommentStub implements ICreateComment {
    async create (data: ICreateComment.Params): Promise<ICreateComment.Result> {
      return makeFakeComment()
    }
  }
  return new CreateCommentStub()
}

const makeFakeComment = (): ICreateComment.Result => ({
  id: 1,
  lessonId: 1,
  userId: 1,
  comment: 'any_comment',
  createdAt: new Date(),
  updatedAt: new Date()
})

const makeFakeRequest = (): CreateCommentController.Params => ({
  lessonId: 1,
  userId: 1,
  comment: 'any_comment'
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
  sut: CreateCommentController
  createCommentStub: ICreateComment
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const createCommentStub = makeCreateComment()
  const validationStub = makeValidation()
  const sut = new CreateCommentController(validationStub, createCommentStub)
  return {
    sut,
    createCommentStub,
    validationStub
  }
}

describe('CreateCommentController', () => {
  test('Should call ICreateComment with correct values', async () => {
    const { sut, createCommentStub } = makeSut()
    const createSpy = jest.spyOn(createCommentStub, 'create')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith({
      lessonId: 1,
      userId: 1,
      comment: 'any_comment'
    })
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return 500 if ICreateComment throws', async () => {
    const { sut, createCommentStub } = makeSut()
    jest.spyOn(createCommentStub, 'create').mockImplementationOnce(async () => {
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

  test('Should call returnErrorDecider if Validation returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    await sut.handle(makeFakeRequest())
    expect(returnErrorDecider).toHaveBeenLastCalledWith(new MissingParamError('any_field'))
  })

  test('Should return 201 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(created(makeFakeComment()))
  })
})
