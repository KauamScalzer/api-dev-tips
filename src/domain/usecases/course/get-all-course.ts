export interface IGetAllCourse {
  getAll (data: IGetAllCourse.Params): Promise<IGetAllCourse.Result>
}

export namespace IGetAllCourse {
  export type Params = {
    skip: number
    take: number
  }
  export type Result = {
    count: number
    data: [{
      id: number
      name: string
      description: string
      author: string
      thumb: string
    }]
  }
}
