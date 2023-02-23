import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { requiredIfEmptyValidator } from 'src/app/helpers/requiredIfEmptyValidator';
import { Country } from 'src/app/interfaces/country';

import { SubscribersService } from 'src/app/services/subscribers.service';
import { SubscriberCreate, SubscriberUpdate } from 'src/app/interfaces/subscriber-create';
import { ActivatedRoute, Router } from '@angular/router';
import { addListenerToControlChanges } from 'src/app/helpers/addListenerToControlChanges';
import { Subscriber } from 'src/app/interfaces/subscriber';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  formData: FormGroup;
  countries: Country[] = [];
  isLoading: boolean = true;

  toEdit: boolean = false;
  idToEdit: number = -1;

  constructor(private _snackBar: MatSnackBar,
              private subscribersService: SubscribersService,
              private router: Router,
              private route: ActivatedRoute) {

    this.formData = new FormGroup({
      Name: new FormControl('',[Validators.required]),
      Email: new FormControl('', [ Validators.email, requiredIfEmptyValidator('Email', 'PhoneNumber') ]),
      CountryCode: new FormControl('', [ requiredIfEmptyValidator('CountryCode', 'Email') ]),
      JobTitle: new FormControl(''),
      PhoneNumber: new FormControl('', [ requiredIfEmptyValidator('PhoneNumber', 'Email')]),
      Area: new FormControl('')
    })

    addListenerToControlChanges(this.formData, 'Email',['PhoneNumber','CountryCode']);
    addListenerToControlChanges(this.formData, 'PhoneNumber',['Email']);
    addListenerToControlChanges(this.formData, 'CountryCode',['Email']);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')

    if( id ){
      this.idToEdit = Number(id);
      this.toEdit = true;
      this.getSubscriber();
    }
  }

  public getSubscriber(): void {
    this.isLoading = true;
    this.subscribersService.getSubscriber(this.idToEdit).subscribe({
      next: (subscriber: Subscriber) => this.handleCorrectGetSubscriber( subscriber ),
      error: ( error: HttpErrorResponse) => this.handleErrorGetSubscriber( error )
    });
  }

  private handleCorrectGetSubscriber( subscriber: Subscriber): void {
    this.isLoading = false;
    const {Name, Email, CountryCode,JobTitle,PhoneNumber, Area} = subscriber;
    this.formData.setValue({Name,Email,CountryCode,JobTitle,PhoneNumber,Area});

  }

  private handleErrorGetSubscriber( errorResponse: HttpErrorResponse ): void {
    this.isLoading = false;
    const { error = 'Server error'} = errorResponse.error;
    this._snackBar.open(error,'',{
      duration: 3000,
      panelClass: ['error-snackbar']
    });
    this.router.navigateByUrl('/content/subscribers');
  }


  public onCreate(): void{
    if( this.formData.invalid ) return;
    this.isLoading = true;
    const subscriber: SubscriberCreate = { ...this.formData.value, Topics: [] };
    this.subscribersService.createSubscriber(subscriber).subscribe({
      next: () => this.handleCorrectResponse( 'Subscriber created successfully' ),
      error: ( error ) => this.handleErrorResponse( error ),
    });
  }

  private handleCorrectResponse(msg: string): void{
    this.isLoading = false;
    this._snackBar.open(msg,'',{
      duration: 3000
    });
    this.router.navigateByUrl("/content/subscribers");
  }

  private handleErrorResponse( errorResp: HttpErrorResponse ): void{
    this.isLoading = false;
    const { Message = 'Server error' } = errorResp.error;
    this._snackBar.open(Message,'',{
      panelClass: ['error-snackbar']
    });
  }

  public onUpdate(): void{
    if( this.formData.invalid ) return;

    const subscriber: SubscriberUpdate = { ...this.formData.value, Id: this.idToEdit, Topics: []};
    this.isLoading = false;
    this.subscribersService.updateSubscriber(this.idToEdit, subscriber ).subscribe({
      next: () => this.handleCorrectResponse( 'Subscriber updated successfully '),
      error: (error) => this.handleErrorResponse(error)
    })
  }

}
