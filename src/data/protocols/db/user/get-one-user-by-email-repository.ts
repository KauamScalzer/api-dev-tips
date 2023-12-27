export interface IGetOneUserByEmailRepository {
  getOne (email: string): Promise<IGetOneUserByEmailRepository.Result>
}

export namespace IGetOneUserByEmailRepository {
  export type Result = {
    id: number
    name: string
    email: string
    password: string
  }
}
