import { UpdateUserModel } from '@/domain/usecases/user'
import { UpdateUser } from './update-user'
import { IUpdateUserRepository, UpdateUserRepositoryParams } from '@/data/protocols/db/user'

interface SutTypes {
  sut: UpdateUser
  updateUserRepository: IUpdateUserRepository
}

const makeUpdateUserRepositoryStub = (): IUpdateUserRepository => {
  class UpdateUserRepositoryStub implements IUpdateUserRepository {
    async update (id: number, data: UpdateUserRepositoryParams): Promise<void> {}
  }
  return new UpdateUserRepositoryStub()
}

const makeFakeUserData = (): UpdateUserModel => ({
  id: 1,
  name: 'any_name',
  email: 'any_email',
  urlImage: 'any_url_image'
})

const makeSut = (): SutTypes => {
  const updateUserRepository = makeUpdateUserRepositoryStub()
  const sut = new UpdateUser(updateUserRepository)
  return {
    sut,
    updateUserRepository
  }
}

describe('UpdateUser usecase', () => {
  test('Should call IUpdateUserRepository with correct values', async () => {
    const { sut, updateUserRepository } = makeSut()
    const createSpy = jest.spyOn(updateUserRepository, 'update')
    await sut.update(makeFakeUserData())
    expect(createSpy).toHaveBeenCalledWith(1, { email: 'any_email', id: 1, name: 'any_name', urlImage: 'any_url_image' })
  })

  test('Should throw if IUpdateUserRepository throws', async () => {
    const { sut, updateUserRepository } = makeSut()
    jest.spyOn(updateUserRepository, 'update').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.update(makeFakeUserData())
    await expect(promise).rejects.toThrow()
  })
})
