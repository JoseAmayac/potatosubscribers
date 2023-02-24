import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/shared/confirm-dialog/confirm-dialog.component';
import { Subscriber } from 'src/app/interfaces/subscriber';
import { ConfirmDialogModel } from 'src/app/models/confirm-dialog-model';
import { SubscribersService } from 'src/app/services/subscribers.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  subscriberId: number = -1;
  subscriber: Subscriber|null = null;
  isLoading : boolean = true;
  properties: string[];

  constructor(private subscribersService: SubscribersService,
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private router: Router,
              private dialog: MatDialog) {
    this.properties = ['Name', 'Email', 'Phone']
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el id desde la ruta
    this.subscriberId = Number( id );

    this.getSubscriber();
  }

  /**
   * Envía una solicitud http get al backend para cargar la información del suscriptor
   * con el id encontrado en la ruta.
   */
  public getSubscriber(): void {
    this.subscribersService.getSubscriber(this.subscriberId).subscribe({
      next: (subscriber: Subscriber) => this.handleCorrectResponse( subscriber ),
      error: (error: HttpErrorResponse) => this.handleErrorResponse( error )
    })
  }

  /**
   * Si la información del suscriptor es cargada correctamente, se guarda dicha información en
   * el atributo subscriber, además, se cambia el valor del atributo isLoading a false.
   */
  private handleCorrectResponse( subscriber: Subscriber ): void {
    this.subscriber = subscriber;
    this.isLoading = false;
  }

  /**
   * Cuando ocurre algún error cargando la información del suscriptor, se notifica dicho error usando
   * un snackbar de angular material, posteriormente, el usuario es redireccionado a la página de suscriptores.
   * @param errorResponse
   */
  private handleErrorResponse( errorResponse: HttpErrorResponse ): void {
    const { error = 'Server error' } = errorResponse.error;
    this._snackBar.open(error, '', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
    this.router.navigateByUrl("/content/subscribers");
  }

  /**
   * Se encarga de manejar el evento click en el botón eliminar, lo que hace que se abra una ventana
   * emergente en donde debe confirmar que realmente desea eliminar el subscriptor con el id enviado
   * como parámetro, si la acción es confirmada se empieza con la ejecución en el backend
   * @param subscriberId el id del subscriptor que desea eliminar
   */
  public onDeleteSubscriber(): void{
    const dialogData = new ConfirmDialogModel(
      "Please, confirm the action",
      "Are you sure you want to delete this subscriber from the database?");

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.startDeleteSubscriber( );
      }
    });

  }

  /**
   * Método encargado de enviar la solicitud http delete al backend para eliminar el suscriptor de
   * la base de datos
   */
  public startDeleteSubscriber(): void{
    this.isLoading = true;
    this.subscribersService.deleteSubscriber(this.subscriber!.Id).subscribe({
      next: () => this.handleCorrectDeleted(),
      error: () => this.handleErrorDelete()
    })
  }

  /**
   * Método encargado de manejar la respuesta correcta cuando se elimina un subscriptor
   * Se muestra un mensaje satisfactorio y se refresca la lista de subscriptores
   */
  private handleCorrectDeleted(): void {
    this.isLoading = false;
    this._snackBar.open('Subscriber deleted successfully', '', { duration: 3000 });
    this.router.navigateByUrl("/content/subscribers");
  }

  /**
   * Si algo sale mal eliminado a un subscriptor, este método se encarga de mostrar un mensaje de error
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
