export interface ICreateUserCourseRepository {
  create (data: ICreateUserCourseRepository.Params): Promise<void>
}

export namespace ICreateUserCourseRepository {
  export type Params = {
    userId: number
    courseId: number
  }
}
