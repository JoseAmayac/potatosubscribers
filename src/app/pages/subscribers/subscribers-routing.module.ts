import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'subscribers'
  },
  {
    path: 'subscribers',
    component: ListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribersRoutingModule { }
