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

    /**
     * Agrega subscriptores a los cambios que ocurran en los campos indicados como segundo parámetro,
     * esto permite actualizar las validaciones de los demás campos
     */
    addListenerToControlChanges(this.formData, 'Email',['PhoneNumber','CountryCode']);
    addListenerToControlChanges(this.formData, 'PhoneNumber',['Email']);
    addListenerToControlChanges(this.formData, 'CountryCode',['Email']);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')

    /**
     * Si en la ruta se encuentra el id, se entenderá que se desea actualizar un recurso
     * por lo tanto se pondrá en true el atributo toEdit y se empezará a cargar la información
     * del recurso con el id que se encuentra en la ruta
     */
    if( id ){
      this.idToEdit = Number(id);
      this.toEdit = true;
      this.getSubscriber();
    }
  }

  /**
   * Permite enviar una solicitud http get al backend usando el servicio SubscribersService,
   * la consulta permite obtener la información en detalle del suscriptor con el id enviado
   */
  public getSubscriber(): void {
    this.isLoading = true;
    this.subscribersService.getSubscriber(this.idToEdit).subscribe({
      next: (subscriber: Subscriber) => this.handleCorrectGetSubscriber( subscriber ),
      error: ( error: HttpErrorResponse) => this.handleErrorGetSubscriber( error )
    });
  }

  /**
   * Si la información del suscriptor es cargada correctamente se cambia el valor del formGroup
   * con la información contenida en la variable subscriber, que son los datos del suscriptor. Al cambiar
   * el valor del formGroup, se llena automaticamente el formulario en el archivo html del componente.
   */
  private handleCorrectGetSubscriber( subscriber: Subscriber): void {
    this.isLoading = false;
    const {Name, Email, CountryCode,JobTitle,PhoneNumber, Area} = subscriber;
    this.formData.setValue({Name,Email,CountryCode,JobTitle,PhoneNumber,Area});

  }

  /**
   * Maneja la lógica necesaria cuando ocurre algún error cargando los datos del suscriptor desde el
   * backend, por ejemplo, que no exista un suscriptor con el id enviado. En caso de cualquier error, este
   * será notificado al usuario y dicho usuario será redireccionado a la página con la lista de suscriptores.
   */
  private handleErrorGetSubscriber( errorResponse: HttpErrorResponse ): void {
    this.isLoading = false;
    const { error = 'Server error'} = errorResponse.error;
    this._snackBar.open(error,'',{
      duration: 3000,
      panelClass: ['error-snackbar']
    });
    this.router.navigateByUrl('/content/subscribers');
  }

  /**
   * Método encargado de enviar una solicitud http post usando el servicio SubscribersService, esto
   * permite la creación de un nuevo suscriptor en la base de datos
   */
  public onCreate(): void{
    if( this.formData.invalid ) return;
    this.isLoading = true;
    const subscriber: SubscriberCreate = { ...this.formData.value, Topics: [] };
    this.subscribersService.createSubscriber(subscriber).subscribe({
      next: () => this.handleCorrectResponse( 'Subscriber created successfully' ),
      error: ( error ) => this.handleErrorResponse( error ),
    });
  }

  /**
   * Ya sea que se ha creado un recurso o se ha actualizado, este método se encarga de tener la lógica
   * necesaria para notificar al usuario que dicho cambio ha sido aplicado y enviará al usuario a otra página.
   */
  private handleCorrectResponse(msg: string): void{
    this.isLoading = false;
    this._snackBar.open(msg,'',{
      duration: 3000
    });
    this.router.navigateByUrl("/content/subscribers");
  }

  /**
   * Si ocurre algún error cuando se está creando o actualizando un suscriptor, en este método se encuentra la
   * lógica que permite mostrar dicho error.
   *
   */
  private handleErrorResponse( errorResp: HttpErrorResponse ): void{
    this.isLoading = false;
    const { Message = 'Server error' } = errorResp.error;
    this._snackBar.open(Message,'',{
      panelClass: ['error-snackbar']
    });
  }


  /**
   * Método encargado de enviar una solicitud http put al backend, esto permite actualizar el recurso
   * con el id enviado, para realizar la consulta se utiliza el servicio SubscribersService.
   */
  public onUpdate(): void{
    if( this.formData.invalid ) return;

    const subscriber: SubscriberUpdate = { ...this.formData.value, Id: this.idToEdit, Topics: []};
    this.isLoading = false;
    this.subscribersService.updateSubscriber(this.idToEdit, subscriber ).subscribe({
      next: () => this.handleCorrectResponse( 'Subscriber updated successfully '),
      error: (error) => this.handleErrorResponse(error)
    })
  }

  /**
   * Este método se encarga de escuchar el evento 'loadComplete' del componente SelectCountry,
   * el evento es disparado cuando se acaba de cargar los países desde el backend. Si algo sale mal
   * será notificado al usuario usando un snackbar de angular material.
   */
  public onCountriesLoaded(event: number): void {
    if( event === 0){
      this._snackBar.open('Error loading information', '', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }

    this.isLoading = false;
  }

}
