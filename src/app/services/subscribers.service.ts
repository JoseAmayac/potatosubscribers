import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetOptions } from '../interfaces/get-options';
import { SubscriberResponse } from '../interfaces/subscriber';
import { SubscriberCreate } from '../interfaces/subscriber-create';

const URL = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private http: HttpClient) { }

  /**
   * Método que realiza una petición http GET al backend para traer la lista de subscriptores,
   * además, si el usuario lo ha indicado, se agregan filtros a estos resultados
   */
  public getSubscribers(options : GetOptions): Observable<SubscriberResponse>{
    const { page, count, criteria, sortOrder, sortType } = options;
    const params = new HttpParams()
      .set("page", page)
      .set("count", count)
      .set("criteria", criteria)
      .set("sortOrder", sortOrder)
      .set("sortType", sortType)

    return this.http.get<SubscriberResponse>(`${URL}/subscribers`, { params });
  }

  public createSubscriber(subscriber: SubscriberCreate): Observable<any>{
    const body = {
      Subscribers: [subscriber]
    }
    return this.http.post(`${URL}/subscribers`,body);
  }

  public deleteSubscriber(subscriberId: number): Observable<any>{
    return this.http.delete(`${URL}/subscribers/${subscriberId}`);
  }
}
