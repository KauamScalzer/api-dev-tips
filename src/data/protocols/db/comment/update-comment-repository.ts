export interface IUpdateCommentRepository {
  update (id: number, comment: string): Promise<void>
}
