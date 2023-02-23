import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.formControl = this.formGroup.get(this.control) as FormControl;
    this.getCountries();
  }

  public getCountries(): void{
    this.countriesService.getCountries().subscribe({
      next: ( countries: Country[] ) => this.handleCorrectResponseCountries( countries ),
      error: ( error: any) => this.handleErrorCountries( error )
    });
  }

  private handleCorrectResponseCountries( countries: Country[]): void{
    this.countries = countries;
  }

  private handleErrorCountries( error: HttpErrorResponse ): void {
    console.log( error );

  }

}