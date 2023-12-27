import { ICreateCommentRepository } from '@/data/protocols/db/comment'
import { CreateComment } from './create-comment'

const makeCreateCommentRepository = (): ICreateCommentRepository => {
  class CreateCommentRepositoryStub implements ICreateCommentRepository {
    async create (data: ICreateCommentRepository.Params): Promise<ICreateCommentRepository.Result> {
      return makeFakeComment()
    }
  }
  return new CreateCommentRepositoryStub()
}

const makeFakeComment = (): ICreateCommentRepository.Result => ({
  id: 1,
  lessonId: 1,
  userId: 1,
  comment: 'any_comment',
  createdAt: new Date(),
  updatedAt: new Date()
})

interface SutTypes {
  sut: CreateComment
  createCommentRepositoryStub: ICreateCommentRepository
}

const makeSut = (): SutTypes => {
  const createCommentRepositoryStub = makeCreateCommentRepository()
  const sut = new CreateComment(createCommentRepositoryStub)
  return {
    sut,
    createCommentRepositoryStub
  }
}

const makeFakeData = (): ICreateCommentRepository.Params => ({
  lessonId: 1,
  userId: 1,
  comment: 'any_comment'
})

describe('CreateComment usecase', () => {
  test('Should call ICreateCommentRepository with correct values', async () => {
    const { sut, createCommentRepositoryStub } = makeSut()
    const encryptSpy = jest.spyOn(createCommentRepositoryStub, 'create')
    await sut.create(makeFakeData())
    expect(encryptSpy).toHaveBeenCalledWith(makeFakeData())
  })

  test('Should throw if ICreateCommentRepository throws', async () => {
    const { sut, createCommentRepositoryStub } = makeSut()
    jest.spyOn(createCommentRepositoryStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.create(makeFakeData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a comment on success', async () => {
    const { sut } = makeSut()
    const result = await sut.create(makeFakeData())
    expect(result).toEqual(makeFakeComment())
  })
})
