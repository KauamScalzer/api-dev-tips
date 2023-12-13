export interface IUpdateCourseRepository {
  update (id: number, data: UpdateCourseParams): Promise<void>
}

export interface UpdateCourseParams {
  id: number
  name: string
  description: string
  author: string
  thumb: string
}
