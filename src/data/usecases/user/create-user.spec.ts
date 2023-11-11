import { Hasher } from '@/data/protocols/criptography'
import { CreateUser } from './create-user'
import { CreateUserModel } from '@/domain/usecases/user'
import { UserModel } from '@/domain/models'
import { ICreateUserRepository, IGetOneUserByEmailRepository } from '@/data/protocols/user'

interface SutTypes {
  sut: CreateUser
  hasherStub: Hasher
  createUserRepositoryStub: ICreateUserRepository
  getOneUserByEmailRepositoryStub: IGetOneUserByEmailRepository
}

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new HasherStub()
}

const makeCreateUserRepository = (): ICreateUserRepository => {
  class CreateUserRepositoryStub implements ICreateUserRepository {
    async create (data: CreateUserModel): Promise<UserModel> {
      return makeFakeUser()
    }
  }
  return new CreateUserRepositoryStub()
}

const makeGetOneUserByEmailRepository = (): IGetOneUserByEmailRepository => {
  class GetOneUserByEmailRepositoryStub implements IGetOneUserByEmailRepository {
    async getOne (email: string): Promise<UserModel> {
      return null
    }
  }
  return new GetOneUserByEmailRepositoryStub()
}

const makeFakeUser = (): UserModel => ({
  id: 1,
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password',
  urlImage: 'valid_url_image'
})

const makeFakeUserData = (): CreateUserModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password',
  urlImage: 'valid_url_image'
})

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher()
  const createUserRepositoryStub = makeCreateUserRepository()
  const getOneUserByEmailRepositoryStub = makeGetOneUserByEmailRepository()
  const sut = new CreateUser(hasherStub, createUserRepositoryStub, getOneUserByEmailRepositoryStub)
  return {
    sut,
    hasherStub,
    createUserRepositoryStub,
    getOneUserByEmailRepositoryStub
  }
}

describe('CreateUser usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const encryptSpy = jest.spyOn(hasherStub, 'hash')
    await sut.create(makeFakeUserData())
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.create(makeFakeUserData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call ICreateUserRepository with correct values', async () => {
    const { sut, createUserRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(createUserRepositoryStub, 'create')
    await sut.create(makeFakeUserData())
    expect(createSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
      urlImage: 'valid_url_image'
    })
  })

  test('Should throw if ICreateUserRepository throws', async () => {
    const { sut, createUserRepositoryStub } = makeSut()
    jest.spyOn(createUserRepositoryStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.create(makeFakeUserData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call IGetOneUserByEmailRepository with correct email', async () => {
    const { sut, getOneUserByEmailRepositoryStub } = makeSut()
    const getOneSpy = jest.spyOn(getOneUserByEmailRepositoryStub, 'getOne')
    await sut.create(makeFakeUserData())
    expect(getOneSpy).toHaveBeenCalledWith('valid_email')
  })

  test('Should throw if IGetOneUserByEmailRepository throw', async () => {
    const { sut, getOneUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(getOneUserByEmailRepositoryStub, 'getOne').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.create(makeFakeUserData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an user on sucess', async () => {
    const { sut } = makeSut()
    const result = await sut.create(makeFakeUserData())
    expect(result).toEqual(makeFakeUser())
  })

  test('Should return null if IGetOneUserByEmailRepository returns an user', async () => {
    const { sut, getOneUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(getOneUserByEmailRepositoryStub, 'getOne').mockReturnValueOnce(new Promise((resolve) => resolve(makeFakeUser())))
    const result = await sut.create(makeFakeUserData())
    expect(result).toBeFalsy()
  })
})
