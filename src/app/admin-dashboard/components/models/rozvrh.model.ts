import {SubjectModel} from "./subject";
import {Teacher} from "./teacher";
import {Classroom} from "./classroom";
import {Time} from "@angular/common";
import {Den} from "./dni.model";


export interface Rozvrh{
  id: number
  den: Den,
  subjectId:number,
  teacherId: number,
  classroomId: number,
  subject: SubjectModel
  teacher: Teacher
  classroom: Classroom
  start: Time,
  finish: Time,



}

