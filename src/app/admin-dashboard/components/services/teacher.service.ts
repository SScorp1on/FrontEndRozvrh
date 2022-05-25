import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, Observable, of, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {Teacher} from "../models/teacher";

@Injectable({
  providedIn: `root`
})

export class TeacherService{

  private  teachersUrl = "http://localhost:8082/api/teacher";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Headers': 'Content-Type',
    })
  }
  constructor(private http: HttpClient,
              private messageService: MessageService) { }
  form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('',Validators.required),
    contact: new FormControl('',Validators.email  )
  })

  initializeFormGroup(){
    this.form.setValue({
      firstName: '',
      lastName: '',
      contact: ''
    })
  }

  getTeachers(){
    return this.http.get<Teacher[]>(this.teachersUrl)
      .pipe(
        tap(_ => this.log('fetched teachers')),
        catchError(this.handleError<Teacher[]>('getTeachers',[]))
      )
  }


  getTeacher(id: number): Observable<Teacher>{
    const url = `${this.teachersUrl}/${id}`;
    return this.http.get<Teacher>(url).pipe(
      tap(_ => this.log(`fetched teacher id=${id}`)),
    //  catchError(this.handleError<Teacher>(`getTeacher id=${id}`))
    );
  }
  addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.teachersUrl,teacher,this.httpOptions).pipe(
      tap((newTeacher: Teacher) => this.log(`added teacher w/ id=${newTeacher.id}`)),
    //  catchError(this.handleError<Teacher>('addTeacher'))
    )
  }
  deleteTeacher(id: number): Observable<Teacher> {
    const url = `${this.teachersUrl}/${id}`;

    return this.http.delete<Teacher>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted teacher id=${id}`)),
    //  catchError(this.handleError<Teacher>('deleteTeacher'))
    );
  }

  updateTeacher(id: number, teacher: Teacher){
    return this.http.put(`${this.teachersUrl}/${id}`, teacher, this.httpOptions).pipe(
      tap(_ => this.log(`updated teacher id=${teacher.id}`)),
   //   catchError(this.handleError<any>('updateTeacher'))
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
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`UcitelService: ${message}`);
  }
}

