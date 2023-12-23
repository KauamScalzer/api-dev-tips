import dotenv from 'dotenv'

dotenv.config({
  path: '.env.local'
})

export default {
  dbNameTest: process.env.DB_NAME_TEST ?? '',
  dbName: process.env.DB_NAME ?? '',
  dbUserName: process.env.DB_USERNAME ?? '',
  dbPassword: process.env.DB_PASSWORD ?? '',
  dbHost: process.env.DB_HOST ?? '',
  dbPort: process.env.DB_PORT ?? '',
  port: process.env.PORT ?? ''
}
