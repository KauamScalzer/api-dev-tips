import { IGetAllCommentsByLessonRepository } from '@/data/protocols/db/comment'
import { GetAllCommentsByLesson } from './get-all-comments-by-lesson'
import { IGetAllCommentsByLesson } from '@/domain/usecases/comment'

const makeGetAllCommentsByLessonRepository = (): IGetAllCommentsByLessonRepository => {
  class GetAllCommentsByLessonRepositoryStub implements IGetAllCommentsByLessonRepository {
    async getAll (data: IGetAllCommentsByLessonRepository.Params): Promise<any> {
      return makeFakeReturn()
    }
  }
  return new GetAllCommentsByLessonRepositoryStub()
}

interface SutTypes {
  sut: GetAllCommentsByLesson
  getAllCommentsByLessonRepositoryStub: IGetAllCommentsByLessonRepository
}

const makeSut = (): SutTypes => {
  const getAllCommentsByLessonRepositoryStub = makeGetAllCommentsByLessonRepository()
  const sut = new GetAllCommentsByLesson(getAllCommentsByLessonRepositoryStub)
  return {
    sut,
    getAllCommentsByLessonRepositoryStub
  }
}

const makeFakeReturn = (): IGetAllCommentsByLessonRepository.Result => {
  return {
    count: 1,
    data: [{
      id: 1,
      userId: 1,
      lessonId: 1,
      comment: 'any_comment',
      createdAt: new Date(),
      updatedAt: new Date()
    }]
  }
}

const makeFakeRequest = (): IGetAllCommentsByLesson.Params => ({
  lessonId: 1,
  take: 2,
  skip: 1
})

describe('GetAllCommentsByLesson usecase', () => {
  test('Should call IGetAllCommentsByLessonRepository with correct values', async () => {
    const { sut, getAllCommentsByLessonRepositoryStub } = makeSut()
    const encryptSpy = jest.spyOn(getAllCommentsByLessonRepositoryStub, 'getAll')
    await sut.getAll(makeFakeRequest())
    expect(encryptSpy).toHaveBeenCalledWith({
      lessonId: 1,
      skip: 0,
      take: 2
    })
  })

  test('Should throw if IGetAllCommentsByLessonRepository throws', async () => {
    const { sut, getAllCommentsByLessonRepositoryStub } = makeSut()
    jest.spyOn(getAllCommentsByLessonRepositoryStub, 'getAll').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.getAll(makeFakeRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return the return of IGetAllCommentsByLessonRepository', async () => {
    const { sut } = makeSut()
    const result = await sut.getAll(makeFakeRequest())
    expect(result).toEqual(makeFakeReturn())
  })
})
