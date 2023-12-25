import { IUpdateLessonRepository } from '@/data/protocols/db/lesson'
import { UpdateLesson } from './update-lesson'
import { IUpdateLesson } from '@/domain/usecases/lesson'

const makeUpdateLessonRepository = (): IUpdateLessonRepository => {
  class UpdateLessonRepositoryStub implements IUpdateLessonRepository {
    async update (id: number, data: IUpdateLessonRepository.Params): Promise<void> {}
  }
  return new UpdateLessonRepositoryStub()
}

interface SutTypes {
  sut: UpdateLesson
  updateLessonRepositoryStub: IUpdateLessonRepository
}

const makeSut = (): SutTypes => {
  const updateLessonRepositoryStub = makeUpdateLessonRepository()
  const sut = new UpdateLesson(updateLessonRepositoryStub)
  return {
    sut,
    updateLessonRepositoryStub
  }
}

const makeFakeData = (): IUpdateLesson.Params => ({
  id: 1,
  courseId: 1,
  name: 'any_name',
  description: 'any_description',
  urlVideo: 'any_url_video'
})

describe('UpdateLesson usecase', () => {
  test('Should call IUpdateLessonRepository with correct values', async () => {
    const { sut, updateLessonRepositoryStub } = makeSut()
    const encryptSpy = jest.spyOn(updateLessonRepositoryStub, 'update')
    await sut.update(makeFakeData())
    expect(encryptSpy).toHaveBeenCalledWith(1, makeFakeData())
  })

  test('Should throw if IUpdateLessonRepository throws', async () => {
    const { sut, updateLessonRepositoryStub } = makeSut()
    jest.spyOn(updateLessonRepositoryStub, 'update').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.update(makeFakeData())
    await expect(promise).rejects.toThrow()
  })
})
