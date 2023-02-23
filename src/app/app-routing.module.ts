import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { IsNotLoggedInGuard } from './guards/is-not-logged-in.guard';

const routes: Routes = [
  {
    path: 'auth',
    canLoad: [IsNotLoggedInGuard],
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'content',
    canLoad: [AuthGuard],
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
