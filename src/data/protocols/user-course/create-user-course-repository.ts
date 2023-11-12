export interface ICreateUserCourseRepository {
  create (data: CreateUserCourseParams): Promise<void>
}

export interface CreateUserCourseParams {
  userId: number
  courseId: number
}
