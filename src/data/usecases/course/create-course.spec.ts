import { ICreateCourseRepository } from '@/data/protocols/db/course'
import { CreateCourse } from './create-course'
import { CreateCourseParams } from '@/domain/usecases/course'

const makeCreateCourseRepository = (): ICreateCourseRepository => {
  class CreateCourseRepositoryStub implements ICreateCourseRepository {
    async create (data: CreateCourseParams): Promise<void> {}
  }
  return new CreateCourseRepositoryStub()
}

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

const makeFakeCourseData = (): any => ({
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
})
