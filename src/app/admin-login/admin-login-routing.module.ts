import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//feature modules
import { AdminLoginComponent } from './admin-login.component';



export const routes: Routes = [
        { path: 'admin', component: AdminLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminLoginRoutingModule { }
