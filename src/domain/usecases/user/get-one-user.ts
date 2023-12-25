export interface IGetOneUser {
  getOne (data: IGetOneUser.Params): Promise<IGetOneUser.Params>
}

export namespace IGetOneUser {
  export type Params = {
    id: number
  }
  export type Result = {
    id: number
    name: string
    email: string
    urlImage: string
  }
}
