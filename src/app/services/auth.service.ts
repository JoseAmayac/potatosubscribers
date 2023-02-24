import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginData } from '../interfaces/login-data';
import { LoginResponse } from '../interfaces/login-response';
const URL = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,
              private router: Router) { }

  public login(loginData: LoginData): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${URL}/account/login`, loginData).pipe(
      tap(( responseData ) => this.saveLoginInfo(responseData))
    );
  }

  /**
   * Se encarga de guardar la información del usuario en el localstorage del
   * navegador
   * @param responseData La respuesta que devuelve el backend
   */
  public saveLoginInfo(responseData: LoginResponse): void{
    const { Token, RefreshToken } = responseData;
    localStorage.setItem("token", Token);
    localStorage.setItem("refreshToken", RefreshToken);
  }

  /**
   * Comprueba si el usuario está autenticado con base en el token
   */
  public isAuthenticated(): boolean{
    return !!this.getToken();
  }

  public getToken(): string{
    return localStorage.getItem("token") || '';
  }
  public getRefreshToken(): string {
    return localStorage.getItem('refreshToken') || '';
  }

  public deleteToken(): void{
    localStorage.removeItem('token');
  }

  public refreshToken(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `RefreshToken ${ this.getRefreshToken() }`
    })
    return this.http.post(`${URL}/account/regenerateToken`, {}, {
      headers
    });
  }

  /**
   * Cierra sesión en la aplicación, eliminando la información del localstorage y redireccionando
   * hacia la pantalla de login
   */
  public logout(): void{
    localStorage.clear();
    this.router.navigateByUrl("/auth", {
      replaceUrl: true
    });
  }
}
