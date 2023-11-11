import { ServerError } from '@/presentation/errors'
import { GetAllCourseController } from './get-all-course-controller'
import { ok, serverError } from '@/presentation/helpers/http'
import { IGetAllCourse, GetAllCourseResult } from '@/domain/usecases/course'

const makeFakeCourse = (): GetAllCourseResult => {
  return [{
    id: 1,
    name: 'any_name',
    description: 'any_description',
    author: 'any_author',
    thumb: 'any_thumb'
  }]
}

const makeGetAllCourse = (): IGetAllCourse => {
  class GetAllCourseStub implements IGetAllCourse {
    async getAll (): Promise<GetAllCourseResult> {
      return makeFakeCourse()
    }
  }
  return new GetAllCourseStub()
}

interface SutTypes {
  sut: GetAllCourseController
  getAllCourseStub: IGetAllCourse
}

const makeSut = (): SutTypes => {
  const getAllCourseStub = makeGetAllCourse()
  const sut = new GetAllCourseController(getAllCourseStub)
  return {
    sut,
    getAllCourseStub
  }
}

describe('GetAllCourseController', () => {
  test('Should call IGetAllCourse with no value', async () => {
    const { sut, getAllCourseStub } = makeSut()
    const createSpy = jest.spyOn(getAllCourseStub, 'getAll')
    await sut.handle()
    expect(createSpy).toHaveBeenCalledWith()
  })

  test('Should return 500 if IGetAllCourse throws', async () => {
    const { sut, getAllCourseStub } = makeSut()
    jest.spyOn(getAllCourseStub, 'getAll').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new ServerError('any_error')))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(makeFakeCourse()))
  })
})
