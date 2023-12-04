import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './user-model'
import { Course } from './course-model'

@Entity('user_course')
export class UserCourse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'integer',
    name: 'user_id',
    })
  userId: number

  @Column({
    type: 'integer',
    name: 'course_id',
    })
  courseId: number

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    })
  updatedAt: Date

  @ManyToOne(() => Course, course => course.userCourses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course: Course

  @ManyToOne(() => User, user => user.userCourses)
  @JoinColumn({ name: 'user_id' })
  user: User
}
