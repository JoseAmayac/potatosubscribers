import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'content',
    loadChildren: () => import('./pages/subscribers/subscribers.module').then( m => m.SubscribersModule )
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
