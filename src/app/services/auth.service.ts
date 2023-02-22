import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginData } from '../interfaces/login-data';
import { LoginResponse } from '../interfaces/login-response';
const URL = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  public login(loginData: LoginData): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${URL}/account/login`, loginData).pipe(
      tap(( responseData ) => this.saveLoginInfo(responseData))
    );
  }

  private saveLoginInfo(responseData: LoginResponse): void{
    const { Token, RefreshToken } = responseData;
    localStorage.setItem("token", Token);
    localStorage.setItem("refreshToken", RefreshToken);
  }
}
