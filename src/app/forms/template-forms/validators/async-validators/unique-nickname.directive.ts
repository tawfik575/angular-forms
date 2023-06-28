import { Directive } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appUniqueNickname]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UniqueNicknameDirective,
      multi: true
    }
  ]
})
export class UniqueNicknameDirective implements AsyncValidator {

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl<any, any>): Promise<ValidationErrors> | Observable<ValidationErrors> {
    const username = control.value.charAt(0).toUpperCase() + control.value.slice(1);

    return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/users/?username=${username}`)
      .pipe(map(responseData => {
        return responseData.length ? { appUniqueNickname: { isTaken: true } } : null;
      }), catchError(() => {
        return of({ appUniqueNickname: { isFailed: true } });
      }));
  }
}