export interface IGetOneCustomRepository <T = any> {
  getOne (data: IGetOneCustomRepository.Params, model: T): Promise<IGetOneCustomRepository.Result>
}

export namespace IGetOneCustomRepository {
  export type Params = {}
  export type Result = any
}
