export interface IGetAllUserCourseByUserRepository {
  getAll (data: IGetAllUserCourseByUserRepository.Params): Promise<any>
}

export namespace IGetAllUserCourseByUserRepository {
  export type Params = {
    userId: number
    take: number
    skip: number
  }
}
