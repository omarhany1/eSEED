import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { TemplateComponent } from './template/template.component';


const routes: Routes = [
  { path: 'home' , component : HomeComponent },
  { path: 'login' , component : LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
  constructor() {
    //console.log(Router);    
  }  
  
}
