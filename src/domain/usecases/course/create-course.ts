export interface ICreateCourseParams {
  name: string
  description: string
  thumb: string
  author: string
}

export interface ICreateCourse {
  create (data: ICreateCourseParams): Promise<void>
}
