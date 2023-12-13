import { IDeleteCourseRepository } from '@/data/protocols/course'
import { DeleteCourse } from './delete-course'

const makeDeleteCourseRepository = (): IDeleteCourseRepository => {
  class DeleteCourseRepositoryStub implements IDeleteCourseRepository {
    async delete (id: number): Promise<void> {}
  }
  return new DeleteCourseRepositoryStub()
}

interface SutTypes {
  sut: DeleteCourse
  deleteCourseRepositoryStub: IDeleteCourseRepository
}

const makeSut = (): SutTypes => {
  const deleteCourseRepositoryStub = makeDeleteCourseRepository()
  const sut = new DeleteCourse(deleteCourseRepositoryStub)
  return {
    sut,
    deleteCourseRepositoryStub
  }
}

const makeFakeCourseData = (): any => (1)

describe('DeleteCourse usecase', () => {
  test('Should call IDeleteCourseRepository with correct values', async () => {
    const { sut, deleteCourseRepositoryStub } = makeSut()
    const encryptSpy = jest.spyOn(deleteCourseRepositoryStub, 'delete')
    await sut.delete(makeFakeCourseData())
    expect(encryptSpy).toHaveBeenCalledWith(makeFakeCourseData())
  })

  test('Should throw if IDeleteCourseRepository throws', async () => {
    const { sut, deleteCourseRepositoryStub } = makeSut()
    jest.spyOn(deleteCourseRepositoryStub, 'delete').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.delete(makeFakeCourseData())
    await expect(promise).rejects.toThrow()
  })
})
