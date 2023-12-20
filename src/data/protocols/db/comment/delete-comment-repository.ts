export interface IDeleteCommentRepository {
  delete (id: number): Promise<void>
}
