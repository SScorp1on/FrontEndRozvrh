import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, Observable, of, tap} from "rxjs";
import {Rozvrh} from "../models/rozvrh.model";

@Injectable({
  providedIn: `root`
})

export class RozvrhService {
  private rozvrhyurl = "http://localhost:8082/api/rozvrhy";

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
    day: new FormControl(Date),
    time: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    predmetName: new FormControl(''),
    ucebnaName: new FormControl('')
  })
  initializeFormGroup() {
    this.form.setValue({
      day: 0,
      time: 0,
      lastName: 0,
      predmetName: 0,
      ucebnaName: 0,

    });
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
