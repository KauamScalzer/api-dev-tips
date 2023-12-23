import env from '@/main/config/env'
import { Connection, ConnectionOptions, createConnection, getRepository } from 'typeorm'

export const TypeormHelper = {
  connection: null as Connection,

  async connect () {
    const connectionOptions: ConnectionOptions = {
      type: 'mysql',
      name: 'default',
      username: env.dbUserName,
      password: env.dbPassword,
      database: env.dbNameTest,
      host: env.dbHost,
      port: parseInt(env.dbPort),
      synchronize: true,
      logging: false,
      entities: [
        'src/infra/db/typeorm/models/*.ts',
        './dist/infra/db/typeorm/models/*.js'
      ]
    }
    this.connection = await createConnection(connectionOptions)
  },

  async disconnect () {
    if (this.connection) {
      await this.connection.close()
    }
  },

  async clear (entity: string) {
    const repository = getRepository(entity)
    await repository.query(`DELETE FROM ${entity}`)
  }
}
