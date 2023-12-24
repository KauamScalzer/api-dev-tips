export interface IUpdateCommentRepository {
  update (data: IUpdateCommentRepository.Params): Promise<void>
}

export namespace IUpdateCommentRepository {
  export type Params = {
    id: number
    comment: string
  }
}
