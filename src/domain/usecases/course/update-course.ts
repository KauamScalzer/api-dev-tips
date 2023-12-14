export interface IUpdateCourse {
  update (data: IUpdateCourse.Params): Promise<void>
}

export namespace IUpdateCourse {
  export type Params = {
    id: number
    name: string
    description: string
    author: string
    thumb: string
  }
}
