import { Hasher } from '@/data/protocols/criptography'
import { CreateUser } from './create-user'
import { ICreateUserRepository } from '@/data/protocols/db/user'
import { ICreateUser, IUserAuthentication } from '@/domain/usecases/user'

interface SutTypes {
  sut: CreateUser
  hasherStub: Hasher
  createUserRepositoryStub: ICreateUserRepository
  userAuthenticationStub: IUserAuthentication
}

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new HasherStub()
}

const makeUserAuthentication = (): IUserAuthentication => {
  class UserAuthenticationStub implements IUserAuthentication {
    async auth (data: IUserAuthentication.Params): Promise<string> {
      return 'any_token'
    }
  }
  return new UserAuthenticationStub()
}

const makeCreateUserRepository = (): ICreateUserRepository => {
  class CreateUserRepositoryStub implements ICreateUserRepository {
    async create (data: ICreateUserRepository.Params): Promise<ICreateUserRepository.Result> {
      return makeFakeUser()
    }
  }
  return new CreateUserRepositoryStub()
}

const makeFakeUser = (): ICreateUserRepository.Result => ({
  id: 1,
  name: 'valid_name',
  email: 'valid_email'
})

const makeFakeUserData = (): ICreateUser.Params => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password'
})

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher()
  const createUserRepositoryStub = makeCreateUserRepository()
  const userAuthenticationStub = makeUserAuthentication()
  const sut = new CreateUser(hasherStub, createUserRepositoryStub, userAuthenticationStub)
  return {
    sut,
    hasherStub,
    createUserRepositoryStub,
    userAuthenticationStub
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
      password: 'hashed_password'
    })
  })

  test('Should throw if ICreateUserRepository throws', async () => {
    const { sut, createUserRepositoryStub } = makeSut()
    jest.spyOn(createUserRepositoryStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.create(makeFakeUserData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call IUserAuthentication with correct values', async () => {
    const { sut, userAuthenticationStub } = makeSut()
    const createSpy = jest.spyOn(userAuthenticationStub, 'auth')
    await sut.create(makeFakeUserData())
    expect(createSpy).toHaveBeenCalledWith({
      email: 'valid_email',
      password: 'valid_password'
    })
  })

  test('Should throw if IUserAuthentication throws', async () => {
    const { sut, userAuthenticationStub } = makeSut()
    jest.spyOn(userAuthenticationStub, 'auth').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.create(makeFakeUserData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an token on sucess', async () => {
    const { sut } = makeSut()
    const result = await sut.create(makeFakeUserData())
    expect(result).toEqual('any_token')
  })
})
