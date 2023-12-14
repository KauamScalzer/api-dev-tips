export interface IGetAllCourseRepository {
  getAll (data: IGetAllCourseRepository.Params): Promise<IGetAllCourseRepository.Result>
}

export namespace IGetAllCourseRepository {
  export type Params = {
    skip: number
    take: number
  }
  export type Result = any
}
