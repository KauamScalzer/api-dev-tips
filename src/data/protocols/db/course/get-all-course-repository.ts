export interface IGetAllCourseRepository {
  getAll (data: IGetAllCourseRepository.Params): Promise<IGetAllCourseRepository.Result>
}

export namespace IGetAllCourseRepository {
  export type Params = {
    skip: number
    take: number
  }
  export type Result = {
    result: Array<{
      id: number
      name: string
      description: string
      author: string
      thumb: string
      createdAt: Date
      updatedAt: Date
    }>
    count: number
  }
}
