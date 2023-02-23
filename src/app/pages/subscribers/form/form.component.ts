import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { requiredIfEmptyValidator } from 'src/app/helpers/requiredIfEmptyValidator';
import { Country } from 'src/app/interfaces/country';
import { CountriesService } from 'src/app/services/countries.service';
import { distinctUntilChanged } from "rxjs";
import { SubscribersService } from 'src/app/services/subscribers.service';
import { SubscriberCreate } from 'src/app/interfaces/subscriber-create';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  formData: FormGroup;
  countries: Country[] = [];
  isLoading: boolean = true;

  constructor(private countriesService: CountriesService,
              private _snackBar: MatSnackBar,
              private subscribersService: SubscribersService,
              private router: Router) {
    this.formData = new FormGroup({
      Name: new FormControl('',[Validators.required]),
      Email: new FormControl('', [ Validators.email, requiredIfEmptyValidator('Email', 'PhoneNumber') ]),
      CountryCode: new FormControl('', [ requiredIfEmptyValidator('CountryCode', 'Email') ]),
      JobTitle: new FormControl(''),
      PhoneNumber: new FormControl('', [ requiredIfEmptyValidator('PhoneNumber', 'Email')]),
      Area: new FormControl('')
    })

    this.addListenerToControlChanges('Email',['PhoneNumber','CountryCode']);
    this.addListenerToControlChanges('PhoneNumber',['Email']);
    this.addListenerToControlChanges('CountryCode',['Email']);
  }

  ngOnInit(): void {
    this.getCountries();
  }

  public getCountries(): void{
    this.isLoading = true;
    this.countriesService.getCountries().subscribe({
      next: ( countries: Country[] ) => this.handleCorrectResponseCountries( countries ),
      error: ( error: any) => this.handleErrorCountries( error )
    });
  }

  private handleCorrectResponseCountries( countries: Country[]): void{
    this.isLoading = false;
    this.countries = countries;
  }

  private handleErrorCountries( error: HttpErrorResponse ): void {
    this.isLoading = false;
    console.log( error );

  }

  public addListenerToControlChanges(controlName: string, controlsToUpdate:string[]):void{
    this.formData.get(controlName)?.valueChanges
    .pipe(distinctUntilChanged())
    .subscribe(() => {
      this.updateControls(controlsToUpdate)
    });
  }
  public updateControls(controls: string[]): void{
    for (const control of controls) {
      const formControl = this.formData.get(control);
      formControl?.updateValueAndValidity();
    }
  }

  public onCreate(): void{
    if( this.formData.invalid ) return;

    const subscriber: SubscriberCreate = { ...this.formData.value, Topics: [] };
    this.subscribersService.createSubscriber(subscriber).subscribe({
      next: ( response ) => this.handleCorrectCreate( response ),
      error: ( error ) => this.handleErrorCreate( error ),
    });
  }

  private handleCorrectCreate( response: any ): void{
    this._snackBar.open('Subscriber created successfully','',{
      duration: 3000
    });
    this.router.navigateByUrl("/content/subscribers");
  }

  private handleErrorCreate( errorResp: HttpErrorResponse ): void{
    const { Message = 'Server error' } = errorResp.error;
    this._snackBar.open(Message,'',{
      panelClass: ['error-snackbar']
    });

  }

}
