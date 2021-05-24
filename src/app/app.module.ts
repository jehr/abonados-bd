import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Modulos
import { ComponentsModule } from './components/components.module';
import { GeneralModule } from './general/general.module';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { LoginModule } from './login/login.module';
import { ServicesModule } from './services/services.module';
import { SharedModule } from './shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { APP_ROUTES } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    APP_ROUTES,
    SharedModule,
    ComponentsModule,
    GeneralModule,
    ServicesModule,
    LoginModule,
    FormsModule,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
