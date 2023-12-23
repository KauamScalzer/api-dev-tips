export interface IDeleteLesson {
  delete (id: number): Promise<void>
}
