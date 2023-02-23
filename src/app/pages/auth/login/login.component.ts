import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginData } from 'src/app/interfaces/login-data';
import { AuthService } from 'src/app/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSending: boolean = false;
  errorMsg: string|null = null;

  constructor(private authService: AuthService,
              private _snackBar: MatSnackBar,
              private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {

  }

  /**
   * Método que envía los datos del usuario al backend para realizar el proceso de autenticación
   */
  public onLogin(): void{
    if( this.loginForm.invalid ) return;

    const loginData: LoginData = { ...this.loginForm.value };
    this.isSending = true;

    this.authService.login(loginData).subscribe({
      next: (_) => this.handleCorrectResponse( ),
      error: ( error ) => this.handleError( error )
    })
  }

  /**
   * En este método se realiza la redirección del usuario a otra página de la aplicación pues ya ha iniciado sesión
   */
  private handleCorrectResponse(){
    this.isSending = false;
    this.router.navigateByUrl("/content",{
      replaceUrl: true,
    });
  }

  /**
   * Si ocurre algún error en la autenticación del usuario, dicho error es manejado en este método y
   * mostrado al usuario usando un snackbar de la librería angular material
   */
  private handleError( errorResponse: HttpErrorResponse ){
    this.isSending = false;
    const { error = 'Server error' } = errorResponse.error;
    this.errorMsg = error;
    this.showSnackBarError();
  }

  /**
   * Muestra el mensaje de error al usuario
   */
  private showSnackBarError(){
    this._snackBar.open(this.errorMsg!, "", {
      duration: 4000,
      panelClass: ['error-snackbar'],

    });
  }

}
