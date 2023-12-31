import { IGetOneUser } from '@/domain/usecases/user'
import { GetOneUser } from './get-one-user'
import { IGetOneUserRepository } from '@/data/protocols/db/user'

interface SutTypes {
  sut: GetOneUser
  getOneUserRepositoryStub: IGetOneUserRepository
}

const GetOneUserRepositoryStub = (): IGetOneUserRepository => {
  class GetOneUserRepositoryStub implements IGetOneUserRepository {
    async getOne (id: number): Promise<IGetOneUserRepository.Result> {
      return {
        id: 1,
        name: 'any_name',
        email: 'any_email'
      }
    }
  }
  return new GetOneUserRepositoryStub()
}

const makeFakeUserData = (): IGetOneUser.Params => ({
  id: 1
})

const makeSut = (): SutTypes => {
  const getOneUserRepositoryStub = GetOneUserRepositoryStub()
  const sut = new GetOneUser(getOneUserRepositoryStub)
  return {
    sut,
    getOneUserRepositoryStub
  }
}

describe('GetOneUser usecase', () => {
  test('Should call IGetOneUserRepository with correct values', async () => {
    const { sut, getOneUserRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(getOneUserRepositoryStub, 'getOne')
    await sut.getOne(makeFakeUserData())
    expect(createSpy).toHaveBeenCalledWith(1)
  })

  test('Should throw if IGetOneUserRepository throws', async () => {
    const { sut, getOneUserRepositoryStub } = makeSut()
    jest.spyOn(getOneUserRepositoryStub, 'getOne').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.getOne(makeFakeUserData())
    await expect(promise).rejects.toThrow()
  })
})
