import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Predmet} from "../models/predmet.model"
import { catchError, tap} from "rxjs";
import { Observable, of } from 'rxjs';
import {MessageService } from "./message.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: `root`
})

export class PredmetService {
  private  predmetyurl = "http://localhost:8082/api/predmety";


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'mode': 'no-cors'
    })
  }
  constructor(private http: HttpClient,
              private messageService: MessageService) { }

    form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl(''),
    computersRequired: new FormControl(false)
  })

  initializeFormGroup(){
    this.form.setValue({
      name: '',
      type: '',
      computersRequired: false
    })
  }
   getPredmety(){
    return this.http.get<Predmet[]>(this.predmetyurl)
      .pipe(
        tap(_ => this.log('fetched predmety')),
        catchError(this.handleError<Predmet[]>('getPredmety',[]))
      )
  }


  getPredmet(id: number): Observable<Predmet>{
    const url = `${this.predmetyurl}/${id}`;
    return this.http.get<Predmet>(url).pipe(
      tap(_ => this.log(`fetched predmet id=${id}`)),
      catchError(this.handleError<Predmet>(`getPredmet id=${id}`))
    );
  }
  addPredmet(predmet: Predmet): Observable<Predmet> {
    return this.http.post<Predmet>(this.predmetyurl,predmet,this.httpOptions).pipe(
      tap((newPredmet: Predmet) => this.log(`added predmet w/ id=${newPredmet.id}`)),
    catchError(this.handleError<Predmet>('addPredmet'))
    )
  }
  deletePredmet(id: number): Observable<Predmet> {
    const url = `${this.predmetyurl}/${id}`;
    return this.http.delete<Predmet>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted predmet id=${id}`)),
      catchError(this.handleError<Predmet>('deletePredmet'))
    );
  }

  updatePredmet(id:number, predmet: Predmet){
    return this.http.put(`${this.predmetyurl}/${id}`, predmet, this.httpOptions).pipe(
      tap(_ =>(predmet: Predmet) => this.log(`updated predmet id=${predmet.id}`)),
      catchError(this.handleError<Predmet>('updatePredmet'))
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
    this.messageService.add(`PredmetService: ${message}`);
  }

}

