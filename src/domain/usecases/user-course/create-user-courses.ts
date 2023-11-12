export interface CreateUserCoursesParams {
  userId: number
  courseIds: [
    id: number
  ]
}

export interface ICreateUserCourses {
  create (data: CreateUserCoursesParams): Promise<void>
}
