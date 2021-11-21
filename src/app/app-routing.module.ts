import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/notFound/notFound.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
