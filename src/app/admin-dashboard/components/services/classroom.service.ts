import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, Observable, of, tap} from "rxjs";
import {Classroom} from "../models/classroom";

@Injectable({
  providedIn: `root`
})

export class ClassroomService{
  private  classroomsUrl = "http://localhost:8082/api/classroom";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Headers': 'Content-Type','Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT','mode': 'no-cors'})
  }

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('',Validators.required),
    computersProviding: new FormControl(false)
  })
  initializeFormGroup(){
    this.form.setValue({
      name: '',
      address: '',
      computersProviding :false
    })
  }
  getClassrooms(){
    return this.http.get<Classroom[]>(this.classroomsUrl)
      .pipe(
        tap(_ => this.log('fetched classrooms')),
        catchError(this.handleError<Classroom[]>('getClassrooms',[]))
      )
  }

  getClassroom(id: number): Observable<Classroom>{
    const url = `${this.classroomsUrl}/${id}`;
    return this.http.get<Classroom>(url).pipe(
      tap(_ => this.log(`fetched classroom id=${id}`)),
      catchError(this.handleError<Classroom>(`getClassroom id=${id}`))
    );
  }
  addClassroom(classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>(this.classroomsUrl,classroom,this.httpOptions).pipe(
      tap((newClassroom: Classroom) => this.log(`added classroom w/ id=${newClassroom.id}`)),
   //   catchError(this.handleError<Classroom>('addClassroom'))
    )
  }
  deleteClassroom(id: number): Observable<Classroom> {
    const url = `${this.classroomsUrl}/${id}`;
    return this.http.delete<Classroom>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted classroom id=${id}`)),
    //  catchError(this.handleError<Classroom>('deleteClassroom'))
    );
  }

  updateClassroom(id: number, classroom: Classroom){
    return this.http.put(`${this.classroomsUrl}/${id}`, classroom, this.httpOptions).pipe(
      tap(_ => this.log(`updated classroom id=${classroom.id}`)),
    //  catchError(this.handleError<any>('updateClassroom'))
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
    this.messageService.add(`ClassroomService: ${message}`);
  }
}
