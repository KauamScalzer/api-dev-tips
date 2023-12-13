export interface IGetOneCourseRepository {
  getOne (id: number): Promise<any>
}
