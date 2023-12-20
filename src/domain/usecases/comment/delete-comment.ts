export interface IDeleteComment {
  delete (id: number): Promise<void>
}
