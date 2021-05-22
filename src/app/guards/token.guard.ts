import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { VerifyTokenService } from '../services/verify-token.service';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {
  constructor(
    private VerifyService: VerifyTokenService
  ) {}
  canActivate(): Promise<boolean> | boolean{
    return this.VerifyService.verificarTiempoDeVidaToken();
  }
  
}
