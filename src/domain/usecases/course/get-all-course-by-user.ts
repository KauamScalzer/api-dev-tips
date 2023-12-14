export interface IGetAllCourseByUser {
  getAll (data: IGetAllCourseByUser.Params): Promise<IGetAllCourseByUser.Result>
}

export namespace IGetAllCourseByUser {
  export type Params = {
    userId: number
    skip: number
    take: number
  }
  export type Result = any
}
