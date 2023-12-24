import { IUpdateCommentRepository } from '@/data/protocols/db/comment'
import { UpdateComment } from './update-comment'
import { IUpdateComment } from '@/domain/usecases/comment'

const makeUpdateCommentRepository = (): IUpdateCommentRepository => {
  class UpdateCommentRepositoryStub implements IUpdateCommentRepository {
    async update (id: number, comment: string): Promise<void> {}
  }
  return new UpdateCommentRepositoryStub()
}

interface SutTypes {
  sut: UpdateComment
  updateCommentRepositoryStub: IUpdateCommentRepository
}

const makeSut = (): SutTypes => {
  const updateCommentRepositoryStub = makeUpdateCommentRepository()
  const sut = new UpdateComment(updateCommentRepositoryStub)
  return {
    sut,
    updateCommentRepositoryStub
  }
}

const makeFakeData = (): IUpdateComment.Params => ({
  id: 1,
  comment: 'any_comment'
})

describe('UpdateComment usecase', () => {
  test('Should call IUpdateCommentRepository with correct values', async () => {
    const { sut, updateCommentRepositoryStub } = makeSut()
    const encryptSpy = jest.spyOn(updateCommentRepositoryStub, 'update')
    await sut.update(makeFakeData())
    expect(encryptSpy).toHaveBeenCalledWith(1, 'any_comment')
  })

  test('Should throw if IUpdateCommentRepository throws', async () => {
    const { sut, updateCommentRepositoryStub } = makeSut()
    jest.spyOn(updateCommentRepositoryStub, 'update').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.update(makeFakeData())
    await expect(promise).rejects.toThrow()
  })
})
