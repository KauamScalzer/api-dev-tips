export interface CreateCourseParams {
  name: string
  description: string
  thumb: string
  author: string
}

export interface ICreateCourse {
  create (data: CreateCourseParams): Promise<void>
}
