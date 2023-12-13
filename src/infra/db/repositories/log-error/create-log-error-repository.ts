import { ICreateLogErrorRepository } from '@/data/protocols/db/log-error'
import { LogError } from '@/infra/db/typeorm/models'
import { getRepository } from 'typeorm'

export class CreateLogErrorRepository implements ICreateLogErrorRepository {
  async create (data: string): Promise<void> {
    const repository = getRepository(LogError)
    await repository.save({
      stack: data,
      date: new Date()
    })
  }
}
