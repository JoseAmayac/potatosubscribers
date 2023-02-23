import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country, CountryResponse } from '../interfaces/country';

const URL = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  public getCountries(): Observable<Country[]>{
    return this.http.get<CountryResponse>(`${URL}/countries`).pipe(
      map((response: CountryResponse) => response.Data)
    );
  }
}
