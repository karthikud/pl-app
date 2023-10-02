// entities/Contract.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
    id!: number

  @Column()
    name!: string

  @Column()
    category!: string

  @Column()
    salesRep!: string

  @Column('float')
    value!: number
}
