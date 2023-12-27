import { ICreateCourseRepository } from '@/data/protocols/db/course'
import { CreateCourse } from './create-course'
import { ICreateCourse } from '@/domain/usecases/course'

const makeCreateCourseRepository = (): ICreateCourseRepository => {
  class CreateCourseRepositoryStub implements ICreateCourseRepository {
    async create (data: ICreateCourseRepository.Params): Promise<ICreateCourseRepository.Result> {
      return makeFakeCourse()
    }
  }
  return new CreateCourseRepositoryStub()
}

const makeFakeCourse = (): ICreateCourseRepository.Result => ({
  id: 1,
  name: 'any_name',
  description: 'any_description',
  thumb: 'any_thumb',
  author: 'any_author',
  createdAt: new Date(),
  updatedAt: new Date()
})

interface SutTypes {
  sut: CreateCourse
  createCourseRepositoryStub: ICreateCourseRepository
}

const makeSut = (): SutTypes => {
  const createCourseRepositoryStub = makeCreateCourseRepository()
  const sut = new CreateCourse(createCourseRepositoryStub)
  return {
    sut,
    createCourseRepositoryStub
  }
}

const makeFakeCourseData = (): ICreateCourse.Params => ({
  name: 'any_name',
  description: 'any_description',
  thumb: 'any_thumb',
  author: 'any_author'
})

describe('CreateCourse usecase', () => {
  test('Should call ICreateCourseRepository with correct values', async () => {
    const { sut, createCourseRepositoryStub } = makeSut()
    const encryptSpy = jest.spyOn(createCourseRepositoryStub, 'create')
    await sut.create(makeFakeCourseData())
    expect(encryptSpy).toHaveBeenCalledWith(makeFakeCourseData())
  })

  test('Should throw if ICreateCourseRepository throws', async () => {
    const { sut, createCourseRepositoryStub } = makeSut()
    jest.spyOn(createCourseRepositoryStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.create(makeFakeCourseData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a course on success', async () => {
    const { sut } = makeSut()
    const result = await sut.create(makeFakeCourseData())
    expect(result).toEqual(makeFakeCourse())
  })
})
