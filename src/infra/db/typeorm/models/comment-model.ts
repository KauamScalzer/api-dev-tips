import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Lesson } from './lesson-model'
import { User } from './user-model'

@Entity('comment')
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'integer',
    name: 'user_id'
    })
  userId: number

  @Column({
    type: 'integer',
    name: 'lesson_id'
    })
  lessonId: number

  @Column({
    type: 'varchar'
    })
  comment: string

  @ManyToOne(() => Lesson, lesson => lesson.comments)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson

  @ManyToOne(() => User, user => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: User
}
