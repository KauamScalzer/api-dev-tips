export interface IGetAllCourse {
  getAll (): Promise<GetAllCourseResult>
}

export interface GetAllCourseResult {
  id: number
  name: string
  description: string
  author: string
  thumb: string
}
