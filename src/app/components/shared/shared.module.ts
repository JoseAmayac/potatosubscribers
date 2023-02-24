import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { SelectCountryComponent } from './select-country/select-country.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
@NgModule({
  declarations: [
    HeaderComponent,
    ConfirmDialogComponent,
    SelectCountryComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [
    HeaderComponent,
    ConfirmDialogComponent,
    SelectCountryComponent
  ]
})
export class SharedModule { }
