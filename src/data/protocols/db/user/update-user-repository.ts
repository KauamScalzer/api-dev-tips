export interface IUpdateUserRepository {
  update (id: number, data: IUpdateUserRepository.Params): Promise<void>
}

export namespace IUpdateUserRepository {
  export type Params = {
    name?: string
    email?: string
    accessToken?: string
    urlImage?: string
  }
}
