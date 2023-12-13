import { IUpdateCourseRepository, UpdateCourseParams } from '@/data/protocols/course'
import { UpdateCourse } from './update-course'

const makeIUpdateCourseRepository = (): IUpdateCourseRepository => {
  class IUpdateCourseRepositoryStub implements IUpdateCourseRepository {
    async update (id: number, data: UpdateCourseParams): Promise<void> {}
  }
  return new IUpdateCourseRepositoryStub()
}

interface SutTypes {
  sut: UpdateCourse
  updateCourseRepositoryStub: IUpdateCourseRepository
}

const makeSut = (): SutTypes => {
  const updateCourseRepositoryStub = makeIUpdateCourseRepository()
  const sut = new UpdateCourse(updateCourseRepositoryStub)
  return {
    sut,
    updateCourseRepositoryStub
  }
}

const makeFakeRequest = (): UpdateCourseParams => ({
  id: 1,
  name: 'any_name',
  description: 'any_description',
  author: 'any_author',
  thumb: 'any_thumb'
})

describe('UpdateCourse usecase', () => {
  test('Should call IUpdateCourseRepository with correct values', async () => {
    const { sut, updateCourseRepositoryStub } = makeSut()
    const encryptSpy = jest.spyOn(updateCourseRepositoryStub, 'update')
    await sut.update(makeFakeRequest())
    expect(encryptSpy).toHaveBeenCalledWith(1, makeFakeRequest())
  })

  test('Should throw if IUpdateCourseRepository throws', async () => {
    const { sut, updateCourseRepositoryStub } = makeSut()
    jest.spyOn(updateCourseRepositoryStub, 'update').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.update(makeFakeRequest())
    await expect(promise).rejects.toThrow()
  })
})
