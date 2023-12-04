export interface IGetAllCourseByUserRepository {
  getAll (data: IGetAllCourseByUserRepository.Params): Promise<any>
}

export namespace IGetAllCourseByUserRepository {
  export type Params = {
    userId: number
    take: number
    skip: number
  }
}
