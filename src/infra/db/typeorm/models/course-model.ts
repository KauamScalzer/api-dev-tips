import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'

@Entity('course')
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar'
    })
  name: string

  @Column({
    type: 'varchar'
    })
  description: string

  @Column({
    type: 'varchar'
    })
  author: string

  @Column({
    type: 'varchar'
    })
  thumb: string
}
