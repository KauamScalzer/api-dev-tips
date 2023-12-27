import { MissingParamError, ServerError } from '@/presentation/errors'
import { DeleteCourseController } from './delete-course-controller'
import { Validation } from '@/presentation/protocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { IDeleteCourse } from '@/domain/usecases/course'

const makeFakeRequest = (): DeleteCourseController.Params => ({
  id: 1
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeDeleteCourse = (): IDeleteCourse => {
  class DeleteCourseStub implements IDeleteCourse {
    async delete (data: IDeleteCourse.Params): Promise<void> {}
  }
  return new DeleteCourseStub()
}

interface SutTypes {
  sut: DeleteCourseController
  validationStub: Validation
  deleteCourseStub: IDeleteCourse
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const deleteCourseStub = makeDeleteCourse()
  const sut = new DeleteCourseController(validationStub, deleteCourseStub)
  return {
    sut,
    validationStub,
    deleteCourseStub
  }
}

describe('DeleteCourseController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const createSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should return 400 if Validation returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call IDeleteCourse with correct values', async () => {
    const { sut, deleteCourseStub } = makeSut()
    const createSpy = jest.spyOn(deleteCourseStub, 'delete')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should return 500 if IDeleteCourse throws', async () => {
    const { sut, deleteCourseStub } = makeSut()
    jest.spyOn(deleteCourseStub, 'delete').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError('any_error')))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
