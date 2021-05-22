import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationComponent } from './components/administration/administration.component';
import { ListProductsComponent } from './components/administration/list-products/list-products.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { 
    path: 'home', 
    canActivate: [LoginGuard],
    component: HomePageComponent
  },
  { 
    path: 'admin', 
    canActivate: [LoginGuard],
    component: AdministrationComponent
  },

  { 
    path: 'admin/products', 
    canActivate: [LoginGuard],
    component: ListProductsComponent  
  },
  { path: 'login', 
    component: LoginComponent 
  },
  { path: 'register', 
    component: RegisterComponent 
  },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }