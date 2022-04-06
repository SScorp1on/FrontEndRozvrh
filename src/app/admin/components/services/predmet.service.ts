import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Predmet} from "../models/predmet.model"
import {catchError,map, tap} from "rxjs";
import { Observable, of } from 'rxjs';
import {MessageService } from "./message.service";

@Injectable({
  providedIn: `root`
})

export class PredmetService {
  private  predmetyurl = "http://localhost:8082/api/predmety";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  constructor(private http: HttpClient,
              private messageService: MessageService) { }


   getPredmety(){
    return this.http.get<Predmet[]>(this.predmetyurl)
      .pipe(
        tap(_ => this.log('fetched predmety')),
        catchError(this.handleError<Predmet[]>('getPredmety',[]))
      )
  }
  getPredmetNo404<Data>(id: number): Observable<Predmet>{
    const url = `${this.predmetyurl}/?id=${id}`
    return this.http.get<Predmet[]>(url)
      .pipe(
        map(predmety => predmety[0]),
        tap(p => {
          const outcome = p ? 'fetched' : 'did not find'
          this.log(`${outcome} predmet id=${id}`)
        }),
        catchError(this.handleError<Predmet>(`getPredmet id=${id}`))
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

  updatePredmet(predmet: Predmet){
    return this.http.put(this.predmetyurl, predmet, this.httpOptions).pipe(
      tap(_ => this.log(`updated predmet id=${predmet.id}`)),
      catchError(this.handleError<any>('updatePredmet'))
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
    this.messageService.add(`PredmetService: ${message}`);
  }
}

