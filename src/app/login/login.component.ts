import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo: string;
  password: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    sessionStorage.clear();
    this.userService.token = null;
  }

  signIn(): void {
    if (!this.password && !this.correo) { return; }
    this.userService.login(this.correo, this.password).subscribe((res: any) => {
      if (res.accessToken) {
        this.router.navigate(['/home']);
        this.alertService.mostrarAlertaSimplesPorTipo('success', res.message, '');
      }else {
        this.alertService.mostrarAlertaSimplesPorTipo('error', res.message, '');
      }
    })

  }

  checkIn(): void {
    this.router.navigate(['/register']);
  }

}
