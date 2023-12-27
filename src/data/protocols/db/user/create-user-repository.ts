export interface ICreateUserRepository {
  create (data: ICreateUserRepository.Params): Promise<ICreateUserRepository.Result>
}

export namespace ICreateUserRepository {
  export type Params = {
    name: string
    email: string
    password: string
  }
  export type Result = {
    id: number
    name: string
    email: string
  }
}
