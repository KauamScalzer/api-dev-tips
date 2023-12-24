import { IGetAllLessonByCourseRepository } from '@/data/protocols/db/lesson'
import { GetAllLessonByCourse } from './get-all-lesson-by-course'
import { IGetAllLessonByCourse } from '@/domain/usecases/lesson'

const makeGetAllLessonByCourseRepository = (): IGetAllLessonByCourseRepository => {
  class GetAllLessonByCourseRepositoryStub implements IGetAllLessonByCourseRepository {
    async getAll (data: IGetAllLessonByCourseRepository.Params): Promise<any> {}
  }
  return new GetAllLessonByCourseRepositoryStub()
}

interface SutTypes {
  sut: GetAllLessonByCourse
  getAllLessonByCourseRepositoryStub: IGetAllLessonByCourseRepository
}

const makeSut = (): SutTypes => {
  const getAllLessonByCourseRepositoryStub = makeGetAllLessonByCourseRepository()
  const sut = new GetAllLessonByCourse(getAllLessonByCourseRepositoryStub)
  return {
    sut,
    getAllLessonByCourseRepositoryStub
  }
}

const makeFakeData = (): IGetAllLessonByCourse.Params => ({
  courseId: 1,
  skip: 1,
  take: 1
})

describe('GetAllLessonByCourse usecase', () => {
  test('Should call IGetAllLessonByCourseRepository with correct values', async () => {
    const { sut, getAllLessonByCourseRepositoryStub } = makeSut()
    const encryptSpy = jest.spyOn(getAllLessonByCourseRepositoryStub, 'getAll')
    await sut.getAll(makeFakeData())
    expect(encryptSpy).toHaveBeenCalledWith({
      courseId: 1,
      skip: 0,
      take: 1
    })
  })

  test('Should throw if IGetAllLessonByCourseRepository throws', async () => {
    const { sut, getAllLessonByCourseRepositoryStub } = makeSut()
    jest.spyOn(getAllLessonByCourseRepositoryStub, 'getAll').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.getAll(makeFakeData())
    await expect(promise).rejects.toThrow()
  })
})
