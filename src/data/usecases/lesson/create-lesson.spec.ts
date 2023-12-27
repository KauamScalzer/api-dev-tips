import { ICreateLessonRepository } from '@/data/protocols/db/lesson'
import { CreateLesson } from './create-lesson'

const makeCreateLessonRepository = (): ICreateLessonRepository => {
  class CreateLessonRepositoryStub implements ICreateLessonRepository {
    async create (data: ICreateLessonRepository.Params): Promise<ICreateLessonRepository.Result> {
      return makeFakeLesson()
    }
  }
  return new CreateLessonRepositoryStub()
}

const makeFakeLesson = (): ICreateLessonRepository.Result => ({
  id: 1,
  courseId: 1,
  name: 'any_name',
  description: 'any_description',
  urlVideo: 'any_url_video',
  createdAt: new Date(),
  updatedAt: new Date()
})

interface SutTypes {
  sut: CreateLesson
  createLessonRepositoryStub: ICreateLessonRepository
}

const makeSut = (): SutTypes => {
  const createLessonRepositoryStub = makeCreateLessonRepository()
  const sut = new CreateLesson(createLessonRepositoryStub)
  return {
    sut,
    createLessonRepositoryStub
  }
}

const makeFakeData = (): ICreateLessonRepository.Params => ({
  courseId: 1,
  name: 'any_name',
  description: 'any_description',
  urlVideo: 'any_url_video'
})

describe('CreateLesson usecase', () => {
  test('Should call ICreateLessonRepository with correct values', async () => {
    const { sut, createLessonRepositoryStub } = makeSut()
    const encryptSpy = jest.spyOn(createLessonRepositoryStub, 'create')
    await sut.create(makeFakeData())
    expect(encryptSpy).toHaveBeenCalledWith(makeFakeData())
  })

  test('Should throw if ICreateLessonRepository throws', async () => {
    const { sut, createLessonRepositoryStub } = makeSut()
    jest.spyOn(createLessonRepositoryStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.create(makeFakeData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a lesson on success', async () => {
    const { sut } = makeSut()
    const result = await sut.create(makeFakeData())
    expect(result).toEqual(makeFakeLesson())
  })
})
