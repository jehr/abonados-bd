import { RouterModule, Routes } from "@angular/router";
import { LoginGuard } from "src/app/guards/login.guard";
import { AdministrationComponent } from "./administration.component";
import { CardsComponent } from "./cards/cards.component";
import { ListEstadiosComponent } from "./list-estadios/list-estadios.component";
import { ListPaquetesComponent } from "./list-paquetes/list-paquetes.component";
import { ListPartidosComponent } from "./list-partidos/list-partidos.component";
import { ListProductsComponent } from "./list-products/list-products.component";

const pagesRoutes: Routes = [
    { 
        path: 'admin',
        component: AdministrationComponent,
        canActivate: [LoginGuard],
        children: [
            { path: 'products', component: ListProductsComponent },
            { path: 'partidos', component: ListPartidosComponent },
            { path: 'paquetes', component: ListPaquetesComponent },
            { path: 'estadio', component: ListEstadiosComponent },
            { path: 'dashboard', component: CardsComponent },
            { path: '', redirectTo: '/admin', pathMatch: 'full'}
        ]
    }
];


export const ADMINISTRATION_ROUTES = RouterModule.forChild( pagesRoutes );