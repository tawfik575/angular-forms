import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UniqueNicknameValidator implements AsyncValidator {

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl<any, any>): Promise<ValidationErrors> | Observable<ValidationErrors> {
    const username = control.value.charAt(0).toUpperCase() + control.value.slice(1);

    return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/users/?username=${username}`).pipe(
      map(responseData => {
        return responseData.length ? { appUniqueNickname: { isTaken: true } } : null;
      }
      ), catchError(err => of({ appUniqueNickname: { isFailed: true } }))
    );
  }
}