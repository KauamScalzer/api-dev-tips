export interface IUpdateCourseRepository {
  update (id: number, data: UpdateCourseRepository): Promise<void>
}

export interface UpdateCourseRepository {
  id: number
  name: string
  description: string
  author: string
  thumb: string
}
