import { IDeleteLessonRepository } from '@/data/protocols/db/lesson'
import { DeleteLesson } from './delete-lesson'
import { IDeleteLesson } from '@/domain/usecases/lesson'

const makeDeleteLessonRepository = (): IDeleteLessonRepository => {
  class DeleteLessonRepositoryStub implements IDeleteLessonRepository {
    async delete (data: number): Promise<void> {}
  }
  return new DeleteLessonRepositoryStub()
}

interface SutTypes {
  sut: DeleteLesson
  deleteLessonRepositoryStub: IDeleteLessonRepository
}

const makeSut = (): SutTypes => {
  const deleteLessonRepositoryStub = makeDeleteLessonRepository()
  const sut = new DeleteLesson(deleteLessonRepositoryStub)
  return {
    sut,
    deleteLessonRepositoryStub
  }
}

const makeFakeData = (): IDeleteLesson.Params => ({
  id: 1
})

describe('DeleteLesson usecase', () => {
  test('Should call IDeleteLessonRepository with correct values', async () => {
    const { sut, deleteLessonRepositoryStub } = makeSut()
    const encryptSpy = jest.spyOn(deleteLessonRepositoryStub, 'delete')
    await sut.delete(makeFakeData())
    expect(encryptSpy).toHaveBeenCalledWith(1)
  })

  test('Should throw if IDeleteLessonRepository throws', async () => {
    const { sut, deleteLessonRepositoryStub } = makeSut()
    jest.spyOn(deleteLessonRepositoryStub, 'delete').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.delete(makeFakeData())
    await expect(promise).rejects.toThrow()
  })
})
