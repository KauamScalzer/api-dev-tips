export interface IDeleteLessonRepository {
  delete (id: number): Promise<void>
}
