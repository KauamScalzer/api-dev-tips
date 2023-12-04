import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { UserCourse } from './user-course-model'
import { Comment } from './comment-model'

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({
    type: 'varchar',
    name: 'url_image'
    })
  urlImage: string

  @Column({
    type: 'text',
    name: 'access_token',
    nullable: true
    })
  accessToken?: string

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

  @OneToMany(() => UserCourse, UserCourse => UserCourse.course)
  userCourses?: UserCourse[]

  @OneToMany(() => Comment, comment => comment.user)
  comments?: Comment[]
}
