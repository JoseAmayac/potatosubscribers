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
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel } from 'src/app/models/confirm-dialog-model';
import { ConfirmDialogComponent } from 'src/app/components/shared/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  //Representa el campo de texto que sirve al usuario para filtrar los resultados
  @ViewChild('inputSearch', { static: true }) searchInput: ElementRef | undefined;

  subscribers: Subscriber[] = [];
  displayedColumns: string[] = ['PublicId', 'Name', 'Email', 'JobTitle', 'Action'];
  currentPage: number = 1;
  totalPerPage: number = 5;
  totalRecords: number = 0;
  isLoading: boolean = true;
  criteria: string = '';
  sortOrder: string = 'PublicId';
  sortType: number = 0;

  constructor(private subscribersService: SubscribersService,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar) { }

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
   * M??todo encargado de cargar la informaci??n obtenida desde el backend en los atributos de la clase.
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
   * M??todo encargado de escuchar los cambios que ocurren en el paginador, esto permite capturar los valores
   * que el paginador devuelve y se realiza la petici??n http con estos nuevos filtros
   * @param event Evento ocurrido en el paginador
   */
  public onPageChange(event: PageEvent){
    const { pageIndex, pageSize } = event;
    this.currentPage = pageIndex + 1;
    this.totalPerPage = pageSize;
    this.getSubscribers();
  }

  /**
   * Se encarga de agregar un listener al input de b??squeda y aplicar una serie de t??cnicas que permiten
   * optimizar el filtro de b??squeda para no realizar demasiadas peticiones http
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
   * M??todo que se encarga de 'escuchar' los cambios ocurridos en la tabla, especificamente en el sort,
   * as?? se puede cambiar el tipo de ordenamiento y la columna por la cual se va a ordenar
   */
  public onSortChange(event: Sort){
    const { active, direction } = event;
    this.sortOrder = active;
    this.sortType = direction == 'asc' ? 0 : 1;
    this.getSubscribers();
  }

  /**
   * Se encarga de manejar el evento click en el bot??n eliminar, lo que hace que se abra una ventana
   * emergente en donde debe confirmar que realmente desea eliminar el subscriptor con el id enviado
   * como par??metro, si la acci??n es confirmada se empieza con la ejecuci??n en el backend
   * @param subscriberId el id del subscriptor que desea eliminar
   */
  public onDeleteSubscriber(subscriberId: number): void{
    const dialogData = new ConfirmDialogModel(
      "Please, confirm the action",
      "Are you sure you want to delete this subscriber from the database?");

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.startDeleteSubscriber( subscriberId );
      }
    });

  }

  /**
   * M??todo encargado de enviar la solicitud http delete al backend, la cual hace que el subscriptor
   * con el id enviado como par??metro sea removido de la base de datos
   * @param subscriberId El id del subscriptor que se va a eliminar
   */
  public startDeleteSubscriber(subscriberId: number): void{
    this.isLoading = true;
    this.subscribersService.deleteSubscriber(subscriberId).subscribe({
      next: () => this.handleCorrectDeleted(),
      error: () => this.handleErrorDelete()
    })
  }

  /**
   * M??todo encargado de manejar la respuesta correcta cuando se elimina un subscriptor
   * Se muestra un mensaje satisfactorio y se refresca la lista de subscriptores
   */
  private handleCorrectDeleted(): void {
    this.isLoading = false;
    this._snackBar.open('Subscriber deleted successfully', '', { duration: 3000 });
    this.getSubscribers();
  }

  /**
   * Si algo sale mal eliminado a un subscriptor, este m??todo se encarga de mostrar un mensaje de error
   * al usuario
   */
  private handleErrorDelete(): void {
    this.isLoading = false;
    this._snackBar.open('Server error', '', {
      panelClass: ['error-snackbar'],
      duration: 3000
    });
  }
}
