import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, Observable, of, tap} from "rxjs";
import {Rozvrh} from "../models/rozvrh.model";
import {SubjectModel} from "../models/subject";
import {Teacher} from "../models/teacher";
import {Classroom} from "../models/classroom";
import {Den} from "../models/dni.model";
import {SubjectService} from "./subject.service";
import {TeacherService} from "./teacher.service";
import {ClassroomService} from "./classroom.service";

@Injectable({
  providedIn: `root`
})

export class RozvrhService {
  private rozvrhyurl = "http://localhost:8082/api/rozvrh";
  subjects: SubjectModel[] = []
  teachers: Teacher[] = []
  classrooms: Classroom[] = []
  dni: Den[]  = [Den.Pondelok,Den.Utorok,Den.Streda,Den.Stvortok,Den.Piatok]
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
    den: new FormControl(''),
    start: new FormControl(0),
    finish: new FormControl(0),
    subject: new FormControl(''),
    teacher: new FormControl(''),
    classroom: new FormControl('')
  })
  initializeFormGroup() {
    this.form.setValue({
      den: '',
      start: 0,
      finish: 0,
      subject: '',
      teacher: '',
      classroom: ''
    })
  }
  getRozvrhy() {
    return this.http.get<Rozvrh[]>(this.rozvrhyurl)
      .pipe(
        tap(_ => this.log('fetched rozvrhy')),
        catchError(this.handleError<Rozvrh[]>('getRozvrhy', []))
      )
  }

  getRozvrh(id: number): Observable<Rozvrh>{
    const url = `${this.rozvrhyurl}/${id}`;
    return this.http.get<Rozvrh>(url).pipe(
      tap(_ => this.log(`fetched rozvrh id=${id}`)),
      catchError(this.handleError<Rozvrh>(`getRozvrh id=${id}`))
    );
  }
  addRozvrh(rozvrh: Rozvrh): Observable<Rozvrh> {
    return this.http.post<Rozvrh>(this.rozvrhyurl,rozvrh,this.httpOptions).pipe(
      tap((newRozvrh: Rozvrh) => this.log(`added rozvrh w/ id=${newRozvrh.id}`)),
      catchError(this.handleError<Rozvrh>('addPredmet'))
    )
  }
  deleteRozvrh(id: number): Observable<Rozvrh> {
    const url = `${this.rozvrhyurl}/${id}`;
    return this.http.delete<Rozvrh>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted rozvrh id=${id}`)),
      catchError(this.handleError<Rozvrh>('deleteRozvrht'))
    );
  }

  updateRozvrh(rozvrh: Rozvrh){
    return this.http.put(`${this.rozvrhyurl}/${rozvrh.id}`, rozvrh, this.httpOptions).pipe(
      tap(_ =>(rozvrh: Rozvrh) => this.log(`updated rozvrh id=${rozvrh.id}`)),
      catchError(this.handleError<Rozvrh>('updateRozvrh'))
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
    this.messageService.add(`RozvrhService: ${message}`);
  }

}
