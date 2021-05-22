import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private usuarioService: UserService
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.usuarioService.verifySesion()) {
      this.router.navigate(['/login']);
    }
    return this.usuarioService.verifySesion();
  }
  
}
