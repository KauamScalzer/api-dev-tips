import { UpdateCommentController } from './update-comment-controller'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'
import { serverError, noContent, badRequest } from '@/presentation/helpers/http'
import { IUpdateComment } from '@/domain/usecases/comment'

const makeUpdateComment = (): IUpdateComment => {
  class UpdateCommentStub implements IUpdateComment {
    async update (data: IUpdateComment.Params): Promise<void> {}
  }
  return new UpdateCommentStub()
}

const makeFakeRequest = (): UpdateCommentController.Params => ({
  id: 1,
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
  sut: UpdateCommentController
  updateCommentStub: IUpdateComment
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const updateCommentStub = makeUpdateComment()
  const validationStub = makeValidation()
  const sut = new UpdateCommentController(validationStub, updateCommentStub)
  return {
    sut,
    updateCommentStub,
    validationStub
  }
}

describe('UpdateCommentController', () => {
  test('Should call IUpdateComment with correct values', async () => {
    const { sut, updateCommentStub } = makeSut()
    const createSpy = jest.spyOn(updateCommentStub, 'update')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should return 500 if IUpdateComment throws', async () => {
    const { sut, updateCommentStub } = makeSut()
    jest.spyOn(updateCommentStub, 'update').mockImplementationOnce(async () => {
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
