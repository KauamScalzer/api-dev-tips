import { IDeleteCourseRepository } from '@/data/protocols/db/course'
import { DeleteCourse } from './delete-course'
import { IDeleteCourse } from '@/domain/usecases/course'

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

const makeFakeCourseData = (): IDeleteCourse.Params => ({
  id: 1
})

describe('DeleteCourse usecase', () => {
  test('Should call IDeleteCourseRepository with correct values', async () => {
    const { sut, deleteCourseRepositoryStub } = makeSut()
    const encryptSpy = jest.spyOn(deleteCourseRepositoryStub, 'delete')
    await sut.delete(makeFakeCourseData())
    expect(encryptSpy).toHaveBeenCalledWith(1)
  })

  test('Should throw if IDeleteCourseRepository throws', async () => {
    const { sut, deleteCourseRepositoryStub } = makeSut()
    jest.spyOn(deleteCourseRepositoryStub, 'delete').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.delete(makeFakeCourseData())
    await expect(promise).rejects.toThrow()
  })
})
