import { MissingParamError, ServerError } from '@/presentation/errors'
import { DeleteLessonController } from './delete-lesson-controller'
import { Validation } from '@/presentation/protocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http'
import { IDeleteLesson } from '@/domain/usecases/lesson'

const makeFakeRequest = (): DeleteLessonController.Params => ({
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

const makeDeleteLesson = (): IDeleteLesson => {
  class DeleteLessonStub implements IDeleteLesson {
    async delete (data: IDeleteLesson.Params): Promise<void> {}
  }
  return new DeleteLessonStub()
}

interface SutTypes {
  sut: DeleteLessonController
  validationStub: Validation
  deleteLessonStub: IDeleteLesson
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const deleteLessonStub = makeDeleteLesson()
  const sut = new DeleteLessonController(validationStub, deleteLessonStub)
  return {
    sut,
    validationStub,
    deleteLessonStub
  }
}

describe('DeleteLessonController', () => {
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

  test('Should call IDeleteLesson with correct values', async () => {
    const { sut, deleteLessonStub } = makeSut()
    const createSpy = jest.spyOn(deleteLessonStub, 'delete')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should return 500 if IDeleteLesson throws', async () => {
    const { sut, deleteLessonStub } = makeSut()
    jest.spyOn(deleteLessonStub, 'delete').mockImplementationOnce(async () => {
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
