import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetOptions } from '../interfaces/get-options';
import { Subscriber, SubscriberResponse } from '../interfaces/subscriber';
import { SubscriberCreate, SubscriberUpdate } from '../interfaces/subscriber-create';

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

  /**
   * Permite enviar información relacionada con un nuevo suscriptor que será creado en la base de datos
   */
  public createSubscriber(subscriber: SubscriberCreate): Observable<any>{
    const body = {
      Subscribers: [subscriber]
    }
    return this.http.post(`${URL}/subscribers`,body);
  }

  /**
   * Método que permite enviar una solicitud http delete al backend para eliminar
   * el suscriptor con el id enviado como parámetro
   */
  public deleteSubscriber(subscriberId: number): Observable<any>{
    return this.http.delete(`${URL}/subscribers/${subscriberId}`);
  }

  /**
   * Permite obtener la información en detalle del suscriptor relacionado con el id enviado
   * @param subscriberId El id del suscriptor al cual se le quiere obtener la información
   * @returns
   */
  public getSubscriber(subscriberId: number): Observable<Subscriber> {
    return this.http.get<Subscriber>(`${URL}/subscribers/${subscriberId}`);
  }

  /**
   * Permite enviar la información del suscriptor actualizada
   * @param subscriberId El id del suscriptor que se desea actualizar
   * @param subscriber La información actualizada del suscriptor
   * @returns
   */
  public updateSubscriber(subscriberId: number, subscriber: SubscriberUpdate): Observable<void> {
    return this.http.put<void>(`${URL}/subscribers/${subscriberId}`, subscriber);
  }
}
