export interface UpdateCourseModel {
  id: number
  name: string
  description: string
  author: string
  thumb: string
}

export interface IUpdateCourse {
  update (data: UpdateCourseModel): Promise<void>
}
