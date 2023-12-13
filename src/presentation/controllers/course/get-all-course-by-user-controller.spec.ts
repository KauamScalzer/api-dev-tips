import { MissingParamError, ServerError } from '@/presentation/errors'
import { GetAllCourseByUserController } from './get-all-course-by-user-controller'
import { HttpRequest, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers/http'
import { IGetAllCourseByUser } from '@/domain/usecases/course'

const makeFakeRequest = (): HttpRequest => ({
  params: {
    userId: 'any_user_id'
  },
  query: {
    take: 'any_take',
    skip: 'any_skip'
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeGetAllCourseByUser = (): IGetAllCourseByUser => {
  class GetAllCourseByUserStub implements IGetAllCourseByUser {
    async getAll (data: IGetAllCourseByUser.Params): Promise<any> {
      return {
        id: 'any'
      }
    }
  }
  return new GetAllCourseByUserStub()
}

interface SutTypes {
  sut: GetAllCourseByUserController
  validationStub: Validation
  getAllCourseByUserStub: IGetAllCourseByUser
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const getAllCourseByUserStub = makeGetAllCourseByUser()
  const sut = new GetAllCourseByUserController(validationStub, getAllCourseByUserStub)
  return {
    sut,
    validationStub,
    getAllCourseByUserStub
  }
}

describe('GetAllCourseByUserController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const createSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith({
      userId: 'any_user_id',
      take: 'any_take',
      skip: 'any_skip'
    })
  })

  test('Should return 400 if Validation returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call IGetAllCourseByUser with correct values', async () => {
    const { sut, getAllCourseByUserStub } = makeSut()
    const createSpy = jest.spyOn(getAllCourseByUserStub, 'getAll')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith({
      skip: 'any_skip',
      take: 'any_take',
      userId: 'any_user_id'
    })
  })

  test('Should return 500 if IGetAllCourseByUser throws', async () => {
    const { sut, getAllCourseByUserStub } = makeSut()
    jest.spyOn(getAllCourseByUserStub, 'getAll').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('any_error')))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({
      id: 'any'
    }))
  })
})
