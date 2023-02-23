import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
@NgModule({
  declarations: [
    HeaderComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
  ],
  exports: [
    HeaderComponent,
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
