import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {catchError, Observable, of, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {SubjectModel} from "../models/subject";

@Injectable({
  providedIn: `root`
})

export class SubjectService {
private  subjectsUrl = "http://localhost:8082/api/subject";


httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
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
getSubjects(){
  return this.http.get<SubjectModel[]>(this.subjectsUrl)
    .pipe(
      tap(_ => this.log('fetched subjects')),
      catchError(this.handleError<SubjectModel[]>('getSubjects',[]))
    )
}

addSubject(subject: SubjectModel): Observable<SubjectModel> {
  return this.http.post<SubjectModel>(this.subjectsUrl,subject,this.httpOptions).pipe(
    tap((newSubject: SubjectModel) => this.log(`added subject w/ id=${newSubject.id}`))
   // catchError(this.handleError<SubjectModel>('addSubject'))
  )
}
deleteSubject(id: number): Observable<SubjectModel> {
  const Url = `${this.subjectsUrl}/${id}`;
  return this.http.delete<SubjectModel>(Url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted subject id=${id}`))
   // catchError(this.handleError<SubjectModel>('deleteSubject'))
  );
}

updateSubject(id:number, subject: SubjectModel){
  return this.http.put(`${this.subjectsUrl}/${id}`, subject, this.httpOptions).pipe(
    tap(_ =>(subject: SubjectModel) => this.log(`updated subject id=${subject.id}`))
    // catchError(this.handleError<SubjectModel>('updateSubject'))
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
  this.messageService.add(`SubjectService: ${message}`);
}

}

