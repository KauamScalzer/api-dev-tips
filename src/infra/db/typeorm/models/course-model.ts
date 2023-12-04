import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { UserCourse } from './user-course-model'
import { Lesson } from './lesson-model'

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

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at'
    })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at'
    })
  updatedAt: Date

  @OneToMany(() => UserCourse, UserCourse => UserCourse.courses)
  userCourses?: UserCourse[]

  @OneToMany(() => Lesson, lesson => lesson.course)
  lessons?: Lesson[]
}
