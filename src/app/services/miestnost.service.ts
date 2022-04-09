import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError,map, tap} from "rxjs";
import { Observable, of } from 'rxjs';
import {MessageService } from "./message.service";
import {Miestnost} from "../models/miestnost.model";

@Injectable({
  providedIn: `root`
})

export class MiestnostService{


  private  miestnostyurl = "http://localhost:8082/api/miestnosty";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient,
              private messageService: MessageService) { }


  getRooms(){
    return this.http.get<Miestnost[]>(this.miestnostyurl)
      .pipe(
        tap(_ => this.log('fetched miestnosty')),
        catchError(this.handleError<Miestnost[]>('getMiestnosty',[]))
      )
  }
  getRoomNo404<Data>(id: number): Observable<Miestnost>{
    const url = `${this.miestnostyurl}/?id=${id}`
    return this.http.get<Miestnost[]>(url)
      .pipe(
        map(miestnosty => miestnosty[0]),
        tap(p => {
          const outcome = p ? 'fetched' : 'did not find'
          this.log(`${outcome} miestnost id=${id}`)
        }),
        catchError(this.handleError<Miestnost>(`getMiestnost id=${id}`))
      )
  }

  getRoom(id: number): Observable<Miestnost>{
    const url = `${this.miestnostyurl}/${id}`;
    return this.http.get<Miestnost>(url).pipe(
      tap(_ => this.log(`fetched miestnost id=${id}`)),
      catchError(this.handleError<Miestnost>(`getMiestnost id=${id}`))
    );
  }
  addRoom(miestnost: Miestnost): Observable<Miestnost> {
    return this.http.post<Miestnost>(this.miestnostyurl,miestnost,this.httpOptions).pipe(
      tap((newMiestnost: Miestnost) => this.log(`added miestnost w/ id=${newMiestnost.id}`)),
      catchError(this.handleError<Miestnost>('addMiestnost'))
    )
  }
  deleteRoom(id: number): Observable<Miestnost> {
    const url = `${this.miestnostyurl}/${id}`;

    return this.http.delete<Miestnost>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted miestnost id=${id}`)),
      catchError(this.handleError<Miestnost>('deleteMiestnost'))
    );
  }

  updateRoom(miestnost: Miestnost){
    return this.http.put(this.miestnostyurl, miestnost, this.httpOptions).pipe(
      tap(_ => this.log(`updated miestnost id=${miestnost.id}`)),
      catchError(this.handleError<any>('updateMiestnost'))
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
    this.messageService.add(`MiestnostService: ${message}`);
  }
}
