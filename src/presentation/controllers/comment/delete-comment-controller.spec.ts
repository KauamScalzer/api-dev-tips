import { MissingParamError, ServerError } from '@/presentation/errors'
import { DeleteCommentController } from './delete-comment-controller'
import { Validation } from '@/presentation/protocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { IDeleteComment } from '@/domain/usecases/comment'

const makeFakeRequest = (): DeleteCommentController.Params => ({
  id: 1
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeDeleteComment = (): IDeleteComment => {
  class DeleteCommentStub implements IDeleteComment {
    async delete (data: IDeleteComment.Params): Promise<void> {}
  }
  return new DeleteCommentStub()
}

interface SutTypes {
  sut: DeleteCommentController
  validationStub: Validation
  deleteCommentStub: IDeleteComment
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const deleteCommentStub = makeDeleteComment()
  const sut = new DeleteCommentController(validationStub, deleteCommentStub)
  return {
    sut,
    validationStub,
    deleteCommentStub
  }
}

describe('DeleteCommentController', () => {
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

  test('Should call IDeleteComment with correct values', async () => {
    const { sut, deleteCommentStub } = makeSut()
    const createSpy = jest.spyOn(deleteCommentStub, 'delete')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should return 500 if IDeleteComment throws', async () => {
    const { sut, deleteCommentStub } = makeSut()
    jest.spyOn(deleteCommentStub, 'delete').mockImplementationOnce(async () => {
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
