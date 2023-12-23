import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Course } from './course-model'
import { Comment } from './comment-model'

@Entity('lesson')
export class Lesson extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'integer',
    name: 'course_id'
    })
  courseId: number

  @Column()
  name: string

  @Column()
  description: string

  @Column({
    type: 'varchar',
    name: 'url_video'
    })
  urlVideo: string

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

  @ManyToOne(() => Course, course => course.lessons, {
    onDelete: 'CASCADE'
    })
  @JoinColumn({ name: 'course_id' })
  course: Course

  @OneToMany(() => Comment, comment => comment.lesson, {
    cascade: true
    })
  comments: Comment[]
}
