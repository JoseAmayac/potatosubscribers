import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'subscribers'
  },
  {
    path: 'subscribers',
    canActivate: [AuthGuard],
    component: ListComponent
  },
  {
    path: 'subscribers/create',
    canActivate: [AuthGuard],
    component: FormComponent
  },
  {
    path: 'subscribers/edit/:id',
    canActivate: [AuthGuard],
    component: FormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribersRoutingModule { }
