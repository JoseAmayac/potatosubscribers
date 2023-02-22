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

  public onLogin(): void{
    if( this.loginForm.invalid ) return;
    const loginData: LoginData = { ...this.loginForm.value };
    this.isSending = true;

    this.authService.login(loginData).subscribe({
      next: (response) => this.handleCorrectResponse( response ),
      error: ( error ) => this.handleError( error )
    })
  }

  private handleCorrectResponse( response: any ){
    this.isSending = false;
    // this.router.navigateByUrl("/content",{
    //   replaceUrl: true,
    // });
  }

  private handleError( errorResponse: HttpErrorResponse ){
    this.isSending = false;
    const { error = 'Server error' } = errorResponse.error;
    this.errorMsg = error;
    this.showSnackBarError();
  }

  private showSnackBarError(){
    this._snackBar.open(this.errorMsg!, "", {
      duration: 4000,
      panelClass: ['error-snackbar'],

    });
  }

}
