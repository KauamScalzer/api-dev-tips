import { CreateCourseController } from './create-course-controller'
import { HttpRequest, Validation } from '@/presentation/protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    description: 'any_description',
    thumb: 'any_thumb',
    author: 'any_author'
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

interface SutTypes {
  sut: CreateCourseController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new CreateCourseController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('CreateCourseController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const createSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(createSpy).toHaveBeenCalledWith({
      name: 'any_name',
      description: 'any_description',
      thumb: 'any_thumb',
      author: 'any_author'
    })
  })
})
