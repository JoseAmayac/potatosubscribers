import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { GetOptions } from 'src/app/interfaces/get-options';
import { Subscriber, SubscriberResponse } from 'src/app/interfaces/subscriber';
import { SubscribersService } from 'src/app/services/subscribers.service';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';


import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  //Representa el campo de texto que sirve al usuario para filtrar los resultados
  @ViewChild('inputSearch', { static: true }) searchInput: ElementRef | undefined;

  subscribers: Subscriber[] = [];
  displayedColumns: string[] = ['PublicId', 'Name', 'Email', 'JobTitle'];
  currentPage: number = 1;
  totalPerPage: number = 5;
  totalRecords: number = 0;
  isLoading: boolean = true;
  criteria: string = '';
  sortOrder: string = 'PublicId';
  sortType: number = 0;

  constructor(private subscribersService: SubscribersService) { }

  ngOnInit(): void {
    this.getSubscribers();
    this.createSearchSubscriber();
  }

  /**
   * Realiza la consulta http al backend para traer la lista de subscriptores, se aplican los filtros que el usuario
   * haya indicado
   */
  public getSubscribers(): void{
    const options: GetOptions = {
      count: this.totalPerPage,
      page: this.currentPage,
      criteria: this.criteria,
      sortOrder: this.sortOrder,
      sortType: this.sortType
    }
    this.isLoading = true;

    this.subscribersService.getSubscribers( options ).subscribe({
      next: ( subscribers ) => this.handleCorrectResponse( subscribers ),
      error: ( error ) => this.handleError( error )
    });
  }

  /**
   * Método encargado de cargar la información obtenida desde el backend en los atributos de la clase.
   * Se cambia el valor de isLoading, subscribers y totalRecords
   * @param response Representa la respuesta obtenida desde el backend
   */
  private handleCorrectResponse( response: SubscriberResponse ): void{
    this.isLoading = false;
    this.subscribers = response.Data;
    this.totalRecords = response.Count;
  }

  /**
   * Se encarga de manejar cualquier error que pueda ocurrir en la consulta
   * @param error El error ocurrido y devuelto desde el backend
   */
  private handleError( error:any ): void{
    this.isLoading = false;
    console.log( error );
  }

  /**
   * Método encargado de escuchar los cambios que ocurren en el paginador, esto permite capturar los valores
   * que el paginador devuelve y se realiza la petición http con estos nuevos filtros
   * @param event Evento ocurrido en el paginador
   */
  public onPageChange(event: PageEvent){
    const { pageIndex, pageSize } = event;
    this.currentPage = pageIndex + 1;
    this.totalPerPage = pageSize;
    this.getSubscribers();
  }

  /**
   * Se encarga de agregar un listener al input de búsqueda y aplicar una serie de técnicas que permiten
   * optimizar el filtro de búsqueda para no realizar demasiadas peticiones http
   */
  public createSearchSubscriber(){
    fromEvent(this.searchInput?.nativeElement, 'keyup').pipe(
      map((event: any) => (event.target as HTMLInputElement).value),
      filter((res:string) => res.trim().length >= 1),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((text:string) => {
      this.currentPage = 1;
      this.criteria = text;
      this.getSubscribers();
    });
  }

  /**
   * Método que se encarga de 'escuchar' los cambios ocurridos en la tabla, especificamente en el sort,
   * así se puede cambiar el tipo de ordenamiento y la columna por la cual se va a ordenar
   */
  public onSortChange(event: Sort){
    const { active, direction } = event;
    this.sortOrder = active;
    this.sortType = direction == 'asc' ? 0 : 1;
    this.getSubscribers();
  }

}
