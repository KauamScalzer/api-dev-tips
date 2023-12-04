export interface IGetAllCourseByUser {
  getAll (data: IGetAllCourseByUser.Params): Promise<any>
}

export namespace IGetAllCourseByUser {
  export type Params = {
    userId: number
    skip: number
    take: number
  }
}
