export interface IDeleteCourseRepository {
  delete (id: number): Promise<void>
}
