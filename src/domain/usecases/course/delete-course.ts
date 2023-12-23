export interface IDeleteCourse {
  delete (data: IDeleteCourse.Params): Promise<void>
}

export namespace IDeleteCourse {
  export type Params = {
    id: number
  }
}
