import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, Observable, of, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {GroupModel} from "../models/group.model";

@Injectable({
  providedIn: `root`
})
export class GroupService {


  private groupUrl = "http://localhost:8082/api/group";


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
  }

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  initializeFormGroup() {
    this.form.setValue({
      name: '',
    })
  }

  getGroups() {
    return this.http.get<GroupModel[]>(this.groupUrl)
      .pipe(
        tap(_ => this.log('fetched groups')),
        catchError(this.handleError<GroupModel[]>('getGroups', []))
      )
  }


  getGroup(id: number): Observable<GroupModel> {
    const Url = `${this.groupUrl}/${id}`;
    return this.http.get<GroupModel>(Url).pipe(
      tap(_ => this.log(`fetched group id=${id}`)),
      catchError(this.handleError<GroupModel>(`getGroup id=${id}`))
    );
  }

  addGroup(group: GroupModel): Observable<GroupModel> {
    return this.http.post<GroupModel>(this.groupUrl, group, this.httpOptions).pipe(
      tap((newGroup: GroupModel) => this.log(`added group w/ id=${newGroup.id}`)),
   //   catchError(this.handleError<GroupModel>('addGroup'))
    )
  }

  deleteGroup(id: number): Observable<GroupModel> {
    const Url = `${this.groupUrl}/${id}`;
    return this.http.delete<GroupModel>(Url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted group id=${id}`)),
    //  catchError(this.handleError<GroupModel>('deleteGroup'))
    );
  }

  updateGroup(id: number, group: GroupModel) {
    return this.http.put(`${this.groupUrl}/${id}`, group, this.httpOptions).pipe(
      tap(_ => (group: GroupModel) => this.log(`updated group id=${group.id}`)),
     // catchError(this.handleError<GroupModel>('updateGroup'))
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
    this.messageService.add(`GroupService: ${message}`);
  }
}
