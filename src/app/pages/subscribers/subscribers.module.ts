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
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    SubscribersRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSortModule
  ]
})
export class SubscribersModule { }
