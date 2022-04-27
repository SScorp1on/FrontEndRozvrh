import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {TeacherService} from "./teacher.service";
import {SubjectService} from "./subject.service";
import {ClassroomService} from "./classroom.service";
import {GroupService} from "./group.service";
import {SubjectModel} from "../models/subject";
import {Teacher} from "../models/teacher";
import {Classroom} from "../models/classroom";
import {GroupModel} from "../models/group.model";
import {Subject, takeUntil} from "rxjs";
import {Day} from "../models/day.model";

@Injectable({
  providedIn: `root`
})

export class MainService implements OnInit, OnDestroy{


  constructor(private teacherService: TeacherService,
              private subjectService: SubjectService,
              private classroomService: ClassroomService,
              private groupService: GroupService) {
  }

  destroy$: Subject<boolean> = new Subject<boolean>();

  subjects: SubjectModel[] = []
  teachers: Teacher[] = []
  classrooms: Classroom[] = []
  groups: GroupModel[] = []
  days: Day[] = []


  getAllObjects(){

    this.subjects = this.subjects.slice()
    this.teachers = this.teachers.slice()
    this.classrooms = this.classrooms.slice()
    this.groups = this.groups.slice()
    this.subjectService.getSubjects().subscribe(x =>{
      this.subjects = x
      console.log(x)
    })
    this.teacherService.getTeachers().subscribe(x => {
      this.teachers = x
    })
    this.classroomService.getClassrooms().subscribe(x => {
      this.classrooms = x
    })
    this.groupService.getGroups().subscribe(x => {
      this.groups = x
    })
}

  ngOnInit(): void {
    this.getAllObjects()
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
