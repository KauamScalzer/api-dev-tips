import { IDeleteCommentRepository } from '@/data/protocols/db/comment'
import { DeleteComment } from './delete-comment'
import { IDeleteComment } from '@/domain/usecases/comment'

const makeDeleteCommentRepository = (): IDeleteCommentRepository => {
  class DeleteCommentRepositoryStub implements IDeleteCommentRepository {
    async delete (data: number): Promise<void> {}
  }
  return new DeleteCommentRepositoryStub()
}

interface SutTypes {
  sut: DeleteComment
  deleteCommentRepositoryStub: IDeleteCommentRepository
}

const makeSut = (): SutTypes => {
  const deleteCommentRepositoryStub = makeDeleteCommentRepository()
  const sut = new DeleteComment(deleteCommentRepositoryStub)
  return {
    sut,
    deleteCommentRepositoryStub
  }
}

const makeFakeData = (): IDeleteComment.Params => ({
  id: 1
})

describe('DeleteComment usecase', () => {
  test('Should call IDeleteCommentRepository with correct values', async () => {
    const { sut, deleteCommentRepositoryStub } = makeSut()
    const encryptSpy = jest.spyOn(deleteCommentRepositoryStub, 'delete')
    await sut.delete(makeFakeData())
    expect(encryptSpy).toHaveBeenCalledWith(1)
  })

  test('Should throw if IDeleteCommentRepository throws', async () => {
    const { sut, deleteCommentRepositoryStub } = makeSut()
    jest.spyOn(deleteCommentRepositoryStub, 'delete').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.delete(makeFakeData())
    await expect(promise).rejects.toThrow()
  })
})
