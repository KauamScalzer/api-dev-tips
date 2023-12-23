export interface IGetOneUser {
  getOne (data: IGetOneUser.Params): Promise<any>
}

export namespace IGetOneUser {
  export type Params = {
    id: number
  }
}
