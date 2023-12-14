import { ICreateUserCourseRepository } from '@/data/protocols/db/user-course'
import { CreateUserCourses } from './create-user-courses'
import { CreateUserCoursesParams } from '@/domain/usecases/user-course'

const makeCreateUserCourseRepository = (): ICreateUserCourseRepository => {
  class CreateUserCourseRepositoryStub implements ICreateUserCourseRepository {
    async create (data: ICreateUserCourseRepository.Params): Promise<void> {}
  }
  return new CreateUserCourseRepositoryStub()
}

interface SutTypes {
  sut: CreateUserCourses
  createUserCourseRepositoryStub: ICreateUserCourseRepository
}

const makeSut = (): SutTypes => {
  const createUserCourseRepositoryStub = makeCreateUserCourseRepository()
  const sut = new CreateUserCourses(createUserCourseRepositoryStub)
  return {
    sut,
    createUserCourseRepositoryStub
  }
}

const makeFakeData = (): CreateUserCoursesParams => ({
  userId: 1,
  courseIds: [{
    id: 1
  }]
})

describe('CreateUserCourses usecase', () => {
  test('Should call ICreateUserCourseRepository with correct values', async () => {
    const { sut, createUserCourseRepositoryStub } = makeSut()
    const encryptSpy = jest.spyOn(createUserCourseRepositoryStub, 'create')
    await sut.create(makeFakeData())
    expect(encryptSpy).toHaveBeenCalledWith({
      userId: 1,
      courseId: 1
    })
  })

  test('Should throw if ICreateUserCourseRepository throws', async () => {
    const { sut, createUserCourseRepositoryStub } = makeSut()
    jest.spyOn(createUserCourseRepositoryStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.create(makeFakeData())
    await expect(promise).rejects.toThrow()
  })
})
