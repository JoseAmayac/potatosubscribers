import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { SubscribersRoutingModule } from './subscribers-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from '@angular/material/sort';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    SubscribersRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSortModule,
    ComponentsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule
  ]
})
export class SubscribersModule { }
