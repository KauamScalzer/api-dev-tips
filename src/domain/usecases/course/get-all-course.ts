export interface IGetAllCourse {
  getAll (data: GetAllCourseParams): Promise<GetAllCourseResult>
}

export interface GetAllCourseParams {
  skip: number
  take: number
}

export interface GetAllCourseResult {
  count: number
  data: Courses
}

export interface Course {
  id: number
  name: string
  description: string
  author: string
  thumb: string
}

export interface Courses extends Array<Course> {}
