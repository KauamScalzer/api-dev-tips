import { MissingParamError, ServerError } from '@/presentation/errors'
import { UpdateCourseController } from './update-course-controller'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { IUpdateCourse } from '@/domain/usecases/course'
import { Validation } from '@/presentation/protocols'

const makeFakeRequest = (): UpdateCourseController.Params => ({
  id: 1,
  name: 'any_name',
  description: 'any_description',
  author: 'any_author',
  thumb: 'any_thumb'
})

const makeUpdateCourse = (): IUpdateCourse => {
  class UpdateCourseStub implements IUpdateCourse {
    async update (data: IUpdateCourse.Params): Promise<void> {}
  }
  return new UpdateCourseStub()
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
  sut: UpdateCourseController
  updateCourseStub: IUpdateCourse
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const updateCourseStub = makeUpdateCourse()
  const validationStub = makeValidation()
  const sut = new UpdateCourseController(validationStub, updateCourseStub)
  return {
    sut,
    updateCourseStub,
    validationStub
  }
}

describe('UpdateCourseController', () => {
  test('Should call IUpdateCourse with no value', async () => {
    const { sut, updateCourseStub } = makeSut()
    const createSpy = jest.spyOn(updateCourseStub, 'update')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const createSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should return 500 if IUpdateCourse throws', async () => {
    const { sut, updateCourseStub } = makeSut()
    jest.spyOn(updateCourseStub, 'update').mockImplementationOnce(async () => {
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

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
