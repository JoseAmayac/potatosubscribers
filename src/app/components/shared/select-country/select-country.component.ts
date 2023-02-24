import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Country } from 'src/app/interfaces/country';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.component.html',
  styleUrls: ['./select-country.component.css']
})
export class SelectCountryComponent implements OnInit {
  countries: Country[] = [];
  @Input() control: string = '';
  formControl!: FormControl;
  @Input() formGroup!: FormGroup;
  @Output() loadComplete: EventEmitter<number> = new EventEmitter<number>();

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.formControl = this.formGroup.get(this.control) as FormControl;
    this.getCountries();
  }

  /**
   * Permite obtener la información de los países guardados en la base de datos
   */
  public getCountries(): void{
    this.countriesService.getCountries().subscribe({
      next: ( countries: Country[] ) => this.handleCorrectResponseCountries( countries ),
      error: ( error: any) => this.handleErrorCountries( error )
    });
  }

  /**
   * Cuando la información de los países es cargada, se emite el evento loadcomplete al componente padre,
   * además, la información de los países es guardada en el atributo countries.
   *
   * @param countries
   */
  private handleCorrectResponseCountries( countries: Country[]): void{
    this.loadComplete.emit(1);
    this.countries = countries;
  }

  /**
   * Si ocurre algún error cargando la información de los países, se emite un evento al componente padre con el valor
   * de cero, lo que indica que ocurrió un error.
   */
  private handleErrorCountries( error: HttpErrorResponse ): void {
    this.loadComplete.emit(0);
  }

}
