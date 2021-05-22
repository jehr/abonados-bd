import { RouterModule, Routes } from "@angular/router";
// import { AdministrationComponent } from "./components/administration/administration.component";
import { HomePageComponent } from "./components/home/home-page/home-page.component";
import { LoginGuard } from "./guards/login.guard";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";


// Componentes a mosotrar

const appRoutes: Routes = [

    {
        path: 'home',
        canActivate: [LoginGuard],
        component: HomePageComponent
    },
    // {
    //     path: 'admin',
    //     canActivate: [LoginGuard],
    //     component: AdministrationComponent
    // },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    { path: '', pathMatch: 'full', redirectTo: '/home' },

];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });