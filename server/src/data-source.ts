import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Contract } from './entities/Contract.js'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'pocketlaw',
  synchronize: true,
  logging: true,
  entities: [Contract],
  subscribers: [],
  migrations: []
})
