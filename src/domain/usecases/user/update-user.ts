export interface IUpdateUser {
  update (data: IUpdateUser.Params): Promise<void>
}

export namespace IUpdateUser {
  export type Params = {
    id: number
    name?: string
    email?: string
    urlImage?: string
  }
}
