export interface IGetAllCourse {
  getAll (): Promise<GetAllCourseResult>
}

export interface Course {
  id: number
  name: string
  description: string
  author: string
  thumb: string
}

export interface GetAllCourseResult extends Array<Course> {}
