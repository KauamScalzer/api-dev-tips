import { DeleteUser } from './delete-user'
import { IDeleteUserRepository } from '@/data/protocols/db/user'

interface SutTypes {
  sut: DeleteUser
  deleteUserRepositoryStub: IDeleteUserRepository
}

const makeDeleteUserRepositoryy = (): IDeleteUserRepository => {
  class DeleteUserRepositoryStub implements IDeleteUserRepository {
    async delete (id: number): Promise<void> {}
  }
  return new DeleteUserRepositoryStub()
}

const makeFakeUserData = (): number => (1)

const makeSut = (): SutTypes => {
  const deleteUserRepositoryStub = makeDeleteUserRepositoryy()
  const sut = new DeleteUser(deleteUserRepositoryStub)
  return {
    sut,
    deleteUserRepositoryStub
  }
}

describe('DeleteUser usecase', () => {
  test('Should call IDeleteUserRepository with correct values', async () => {
    const { sut, deleteUserRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(deleteUserRepositoryStub, 'delete')
    await sut.delete(makeFakeUserData())
    expect(createSpy).toHaveBeenCalledWith(1)
  })

  test('Should throw if IDeleteUserRepository throws', async () => {
    const { sut, deleteUserRepositoryStub } = makeSut()
    jest.spyOn(deleteUserRepositoryStub, 'delete').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.delete(makeFakeUserData())
    await expect(promise).rejects.toThrow()
  })
})
