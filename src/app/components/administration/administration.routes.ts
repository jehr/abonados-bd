import { RouterModule, Routes } from "@angular/router";
import { LoginGuard } from "src/app/guards/login.guard";
import { AdministrationComponent } from "./administration.component";
import { CardsComponent } from "./cards/cards.component";
import { ListProductsComponent } from "./list-products/list-products.component";

const pagesRoutes: Routes = [
    { 
        path: 'admin',
        component: AdministrationComponent,
        canActivate: [LoginGuard],
        children: [
            { path: 'products', component: ListProductsComponent },
            { path: 'dashboard', component: CardsComponent },
            { path: '', redirectTo: '/admin', pathMatch: 'full'}
        ]
    }
];


export const ADMINISTRATION_ROUTES = RouterModule.forChild( pagesRoutes );