import { IGetAllCourseRepository } from '@/data/protocols/course'
import { GetAllCourse } from './get-all-course'
import { GetAllCourseResult } from '@/domain/usecases/course'

const makeGetAllCourseRepository = (): IGetAllCourseRepository => {
  class GetAllCourseRepositoryStub implements IGetAllCourseRepository {
    async getAll (): Promise<GetAllCourseResult> {
      return makeFakeCourse()
    }
  }
  return new GetAllCourseRepositoryStub()
}

interface SutTypes {
  sut: GetAllCourse
  getAllCourseRepositoryStub: IGetAllCourseRepository
}

const makeSut = (): SutTypes => {
  const getAllCourseRepositoryStub = makeGetAllCourseRepository()
  const sut = new GetAllCourse(getAllCourseRepositoryStub)
  return {
    sut,
    getAllCourseRepositoryStub
  }
}

const makeFakeCourse = (): GetAllCourseResult => {
  return [{
    id: 1,
    name: 'any_name',
    description: 'any_description',
    author: 'any_author',
    thumb: 'any_thumb'
  }]
}

describe('GetAllCourse usecase', () => {
  test('Should call IGetAllCourseRepository with correct values', async () => {
    const { sut, getAllCourseRepositoryStub } = makeSut()
    const encryptSpy = jest.spyOn(getAllCourseRepositoryStub, 'getAll')
    await sut.getAll()
    expect(encryptSpy).toHaveBeenCalledWith()
  })

  test('Should throw if IGetAllCourseRepository throws', async () => {
    const { sut, getAllCourseRepositoryStub } = makeSut()
    jest.spyOn(getAllCourseRepositoryStub, 'getAll').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.getAll()
    await expect(promise).rejects.toThrow()
  })

  test('Should return the return of IGetAllCourseRepository', async () => {
    const { sut } = makeSut()
    const result = await sut.getAll()
    expect(result).toEqual(makeFakeCourse())
  })
})
