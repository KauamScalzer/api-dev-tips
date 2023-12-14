export interface IUpdateCourseRepository {
  update (id: number, data: IUpdateCourseRepository.Params): Promise<void>
}

export namespace IUpdateCourseRepository {
  export type Params = {
    name: string
    description: string
    author: string
    thumb: string
  }
}
