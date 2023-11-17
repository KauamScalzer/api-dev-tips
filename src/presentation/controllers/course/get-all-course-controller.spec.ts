import { MissingParamError, ServerError } from '@/presentation/errors'
import { GetAllCourseController } from './get-all-course-controller'
import { badRequest, ok, serverError } from '@/presentation/helpers/http'
import { IGetAllCourse, GetAllCourseResult } from '@/domain/usecases/course'
import { HttpRequest, Validation } from '@/presentation/protocols'

const makeFakeCourse = (): GetAllCourseResult => {
  return {
    count: 1,
    data: [{
      id: 1,
      name: 'any_name',
      description: 'any_description',
      author: 'any_author',
      thumb: 'any_thumb'
    }]
  }
}

const makeFakeRequest = (): HttpRequest => ({
  query: {
    take: 1,
    skip: 5
  }
})

const makeGetAllCourse = (): IGetAllCourse => {
  class GetAllCourseStub implements IGetAllCourse {
    async getAll (): Promise<GetAllCourseResult> {
      return makeFakeCourse()
    }
  }
  return new GetAllCourseStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: GetAllCourseController
  getAllCourseStub: IGetAllCourse
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const getAllCourseStub = makeGetAllCourse()
  const validationStub = makeValidation()
  const sut = new GetAllCourseController(getAllCourseStub, validationStub)
  return {
    sut,
    getAllCourseStub,
    validationStub
  }
}

describe('GetAllCourseController', () => {
  test('Should call IGetAllCourse with no value', async () => {
    const { sut, getAllCourseStub } = makeSut()
    const createSpy = jest.spyOn(getAllCourseStub, 'getAll')
    const httpRequest = makeFakeRequest()
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith(httpRequest.query)
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const createSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith(httpRequest.query)
  })

  test('Should return 500 if IGetAllCourse throws', async () => {
    const { sut, getAllCourseStub } = makeSut()
    jest.spyOn(getAllCourseStub, 'getAll').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('any_error')))
  })

  test('Should return 400 if Validation returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeCourse()))
  })
})
