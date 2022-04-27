import {SubjectModel} from "../models/subject";
import {Teacher} from "../models/teacher";
import {Classroom} from "../models/classroom";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {SubjectService} from "./subject.service";
import {TeacherService} from "./teacher.service";
import {ClassroomService} from "./classroom.service";
import {FormControl, FormGroup} from "@angular/forms";
import {catchError, Observable, of, tap} from "rxjs";
import {TimeblockModel} from "../models/timeblock.model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: `root`
})

export class TimeblockService{

private timeblockUrl = "http://localhost:8082/api/timeblock";
subjects: SubjectModel[] = []
teachers: Teacher[] = []
classrooms: Classroom[] = []
start!: number
finish!: number
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
}
constructor(private http: HttpClient,
  private messageService: MessageService,
  private subjectService: SubjectService,
  private teacherService: TeacherService,
  private classroomService: ClassroomService
) { this.subjects = this.subjects.slice();
  this.subjectService.getSubjects().subscribe(x => {
    this.subjects = x
    console.log(this.subjects)
  })
  this.teachers = this.teachers.slice();
  this.teacherService.getTeachers().subscribe(x => {
    this.teachers = x
    console.log(this.teachers)
  })
  this.classrooms = this.classrooms.slice();
  this.classroomService.getClassrooms().subscribe(x => {
    this.classrooms = x
    console.log(this.classrooms)
  }) }

form: FormGroup = new FormGroup({
  day: new FormControl(''),
  start: new FormControl(0),
  finish: new FormControl(0),
  subject: new FormControl(''),
  teacher: new FormControl(''),
  classroom: new FormControl('')
})
initializeFormGroup() {
  this.form.setValue({
    day: '',
    start: 0,
    finish: 0,
    subject: '',
    teacher: '',
    classroom: ''
  })
}
getTimeblocks() {
  return this.http.get<TimeblockModel[]>(this.timeblockUrl)
    .pipe(
      tap(_ => this.log('fetched timeblocks')),
      catchError(this.handleError<TimeblockModel[]>('getTimeblockModels', []))
    )
}

getTimeblock(id: number): Observable<TimeblockModel>{
  const url = `${this.timeblockUrl}/${id}`;
  return this.http.get<TimeblockModel>(url).pipe(
    tap(_ => this.log(`fetched timeblock id=${id}`)),
    catchError(this.handleError<TimeblockModel>(`getTimeblockModel id=${id}`))
  );
}
addTimeblock(timeblock: TimeblockModel): Observable<TimeblockModel> {
  return this.http.post<TimeblockModel>(this.timeblockUrl,timeblock,this.httpOptions).pipe(
    tap((newTimeblockModel: TimeblockModel) => this.log(`added timeblock w/ id=${newTimeblockModel.id}`)),
    catchError(this.handleError<TimeblockModel>('addTimeblockModel'))
  )
}
deleteTimeblock(id: number): Observable<TimeblockModel> {
  const url = `${this.timeblockUrl}/${id}`;
  return this.http.delete<TimeblockModel>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted timeblock id=${id}`)),
    catchError(this.handleError<TimeblockModel>('deleteTimeblockModel'))
  );
}

updateTimeblock(id:number, timeblock: TimeblockModel){
  return this.http.put(`${this.timeblockUrl}/${id}`, timeblock, this.httpOptions).pipe(
    tap(_ =>(rozvrh: TimeblockModel) => this.log(`updated timeblock id=${rozvrh.id}`)),
    catchError(this.handleError<TimeblockModel>('updateTimeblockModel'))
  );
}

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
private log(message: string) {
  this.messageService.add(`TimeblockModelService: ${message}`);
}

}
