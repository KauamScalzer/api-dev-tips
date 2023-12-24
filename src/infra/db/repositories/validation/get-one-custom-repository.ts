import { IGetOneCustomRepository } from '@/data/protocols/db/validations'
import { getRepository } from 'typeorm'

export class GetOneCustomRepository implements IGetOneCustomRepository {
  async getOne (data: IGetOneCustomRepository.Params, model: string): Promise<IGetOneCustomRepository.Result> {
    const repository = getRepository(model)
    return await repository.findOne({
      where: data
    })
  }
}
