import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm'
import { Course } from './course-model'

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

  @ManyToOne(() => Course, course => course.lessons)
  @JoinColumn({ name: 'course_id' })
  course: Course
}
