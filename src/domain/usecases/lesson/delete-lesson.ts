export interface IDeleteLesson {
  delete (id: IDeleteLesson.Params): Promise<void>
}

export namespace IDeleteLesson {
  export type Params = {
    id: number
  }
}
