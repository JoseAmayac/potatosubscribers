import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { DetailComponent } from './detail/detail.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'subscribers'
  },
  {
    path: 'subscribers',
    children: [
      {
        path: '',
        pathMatch: 'full',
        canActivate: [AuthGuard],
        component: ListComponent
      },
      {
        path: 'create',
        canActivate: [AuthGuard],
        component: FormComponent
      },
      {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        component: FormComponent
      },
      {
        path: 'details/:id',
        canActivate: [AuthGuard],
        component: DetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribersRoutingModule { }
