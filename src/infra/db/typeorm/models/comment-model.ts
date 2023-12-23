import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
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

  @ManyToOne(() => Lesson, lesson => lesson.comments, {
    onDelete: 'CASCADE'
    })
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson

  @ManyToOne(() => User, user => user.comments, {
    onDelete: 'CASCADE'
    })
  @JoinColumn({ name: 'user_id' })
  user: User
}
