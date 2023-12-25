export interface IGetAllUserCourseByUserRepository {
  getAll (data: IGetAllUserCourseByUserRepository.Params): Promise<IGetAllUserCourseByUserRepository.Result>
}

export namespace IGetAllUserCourseByUserRepository {
  export type Params = {
    userId: number
    take: number
    skip: number
  }
  export type Result = {
    result: Array<{
      id: number
      userId: number
      courseId: number
      createdAt: Date
      updatedAt: Date
    }>
    count: number
  }
}
