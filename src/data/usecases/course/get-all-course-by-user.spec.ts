import { IGetAllUserCourseByUserRepository } from '@/data/protocols/user-course'
import { GetAllCourseByUser } from './get-all-course-by-user'
import { IGetOneCourseRepository } from '@/data/protocols/course'

const makeGetAllUserCourseByUserRepository = (): IGetAllUserCourseByUserRepository => {
  class GetAllUserCourseByUserRepositoryStub implements IGetAllUserCourseByUserRepository {
    async getAll (data: IGetAllUserCourseByUserRepository.Params): Promise<any> {
      return {
        data: [{
          courseId: 1
        }]
      }
    }
  }
  return new GetAllUserCourseByUserRepositoryStub()
}

const makeGetOneCourseRepository = (): IGetOneCourseRepository => {
  class GetOneCourseRepositoryRepositoryStub implements IGetOneCourseRepository {
    async getOne (id: number): Promise<any> {
      return {
        id: 1,
        name: 'any_name'
      }
    }
  }
  return new GetOneCourseRepositoryRepositoryStub()
}

interface SutTypes {
  sut: GetAllCourseByUser
  getAllUserCourseByUserRepositoryStub: IGetAllUserCourseByUserRepository
  getOneCourseRepositoryStub: IGetOneCourseRepository
}

const makeSut = (): SutTypes => {
  const getAllUserCourseByUserRepositoryStub = makeGetAllUserCourseByUserRepository()
  const getOneCourseRepositoryStub = makeGetOneCourseRepository()
  const sut = new GetAllCourseByUser(getAllUserCourseByUserRepositoryStub, getOneCourseRepositoryStub)
  return {
    sut,
    getAllUserCourseByUserRepositoryStub,
    getOneCourseRepositoryStub
  }
}

const makeFakeCourseData = (): any => ({
  userId: 1,
  skip: 1,
  take: 10
})

describe('GetAllCourseByUser usecase', () => {
  test('Should call IGetAllUserCourseByUserRepository with correct values', async () => {
    const { sut, getAllUserCourseByUserRepositoryStub } = makeSut()
    const encryptSpy = jest.spyOn(getAllUserCourseByUserRepositoryStub, 'getAll')
    await sut.getAll(makeFakeCourseData())
    expect(encryptSpy).toHaveBeenCalledWith({
      skip: 0,
      take: 10,
      userId: 1
    })
  })

  test('Should call IGetOneCourseRepository with correct values', async () => {
    const { sut, getOneCourseRepositoryStub } = makeSut()
    const encryptSpy = jest.spyOn(getOneCourseRepositoryStub, 'getOne')
    await sut.getAll(makeFakeCourseData())
    expect(encryptSpy).toHaveBeenCalledWith(1)
  })

  test('Should throw if IGetAllUserCourseByUserRepository throws', async () => {
    const { sut, getAllUserCourseByUserRepositoryStub } = makeSut()
    jest.spyOn(getAllUserCourseByUserRepositoryStub, 'getAll').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.getAll(makeFakeCourseData())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if IGetOneCourseRepository throws', async () => {
    const { sut, getOneCourseRepositoryStub } = makeSut()
    jest.spyOn(getOneCourseRepositoryStub, 'getOne').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.getAll(makeFakeCourseData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return on success', async () => {
    const { sut } = makeSut()
    const result = await sut.getAll(makeFakeCourseData())
    expect(result).toEqual({ count: 1, data: [{ id: 1, name: 'any_name' }] })
  })
})
