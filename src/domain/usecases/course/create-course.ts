export interface ICreateCourse {
  create (data: ICreateCourse.Params): Promise<void>
}

export namespace ICreateCourse {
  export type Params = {
    name: string
    description: string
    thumb: string
    author: string
  }
}
