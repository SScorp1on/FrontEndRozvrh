import {SubjectModel} from "./subject";
import {Teacher} from "./teacher";
import {Classroom} from "./classroom";
import {Time} from "@angular/common";
import {Day} from "./day.model";

export interface TimeblockModel{
  id: number,
  day: Day,
  subjectId:number,
  teacherId: number,
  classroomId: number,
  subject: SubjectModel
  teacher: Teacher
  classroom: Classroom
  start: Time,
  finish: Time,

}
