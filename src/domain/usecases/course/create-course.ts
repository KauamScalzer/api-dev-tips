export interface ICreateCourse {
  create (data: ICreateCourse.Params): Promise<ICreateCourse.Result>
}

export namespace ICreateCourse {
  export type Params = {
    name: string
    description: string
    thumb: string
    author: string
  }
  export type Result = {
    id: number
    name: string
    description: string
    thumb: string
    author: string
    createdAt: Date
    updatedAt: Date
  }
}
