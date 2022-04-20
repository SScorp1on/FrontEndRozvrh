import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ucitel} from "../models/ucitel.model";
import {catchError, tap} from "rxjs";
import { Observable, of } from 'rxjs';
import {MessageService } from "./message.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: `root`
})

export class UcitelService {
  private  teachersurl = "http://localhost:8082/api/ucitelia";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'PUT',
      'Access-Control-Allow-Origin': '*',
      'mode': 'no-cors'
    })
  }
  constructor(private http: HttpClient,
              private messageService: MessageService) { }
  form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('',Validators.required),
    contact: new FormControl('',Validators.required)
  })

  initializeFormGroup(){
    this.form.setValue({
      firstName: '',
      lastName: '',
      contact: ''
    })
  }

  getTeachers(){
    return this.http.get<Ucitel[]>(this.teachersurl)
      .pipe(
        tap(_ => this.log('fetched teachers')),
        catchError(this.handleError<Ucitel[]>('getTeachers',[]))
      )
  }


  getTeacher(id: number): Observable<Ucitel>{
    const url = `${this.teachersurl}/${id}`;
    return this.http.get<Ucitel>(url).pipe(
      tap(_ => this.log(`fetched teacher id=${id}`)),
      catchError(this.handleError<Ucitel>(`getTeacher id=${id}`))
    );
  }
  addTeacher(teacher: Ucitel): Observable<Ucitel> {
    return this.http.post<Ucitel>(this.teachersurl,teacher,this.httpOptions).pipe(
      tap((newTeacher: Ucitel) => this.log(`added teacher w/ id=${newTeacher.id}`)),
      catchError(this.handleError<Ucitel>('addTeacher'))
    )
  }
  deleteTeacher(id: number): Observable<Ucitel> {
    const url = `${this.teachersurl}/${id}`;

    return this.http.delete<Ucitel>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted teacher id=${id}`)),
      catchError(this.handleError<Ucitel>('deleteTeacher'))
    );
  }

  updateTeacher(id: number, teacher: Ucitel){
    return this.http.put(`${this.teachersurl}/${id}`, teacher, this.httpOptions).pipe(
      tap(_ => this.log(`updated teacher id=${teacher.id}`)),
      catchError(this.handleError<any>('updateTeacher'))
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

