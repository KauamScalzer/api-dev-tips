export interface IGetOneUserRepository {
  getOne (id: number): Promise<IGetOneUserRepository.Result>
}

export namespace IGetOneUserRepository {
  export type Result = {
    id: number
    name: string
    email: string
    urlImage: string
  }
}
