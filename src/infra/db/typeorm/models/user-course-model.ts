import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, BaseEntity, Column } from 'typeorm'
import { User } from './user-model'
import { Course } from './course-model'

@Entity('user_course')
export class UserCourse extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'integer',
    name: 'user_id'
    })
  userId: number

  @Column({
    type: 'integer',
    name: 'course_id'
    })
  courseId: number

  @ManyToOne(() => Course, course => course.userCourses)
  @JoinColumn({ name: 'course_id' })
  courses: Course

  @ManyToOne(() => User, user => user.userCourses)
  @JoinColumn({ name: 'user_id' })
  users: User
}