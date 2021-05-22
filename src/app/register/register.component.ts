import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  lastname: string;
  email: string;
  phone: number;
  password: string;
  repeatPassword: string;

  constructor(private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  register(): void {
    this.router.navigate(['/login']);

    if (!this.name && !this.lastname && !this.email && !this.phone  && !this.password && !this.repeatPassword)  { return; }
    this.userService.register(
       this.name, this.lastname, this.email, this.phone, this.password, this.repeatPassword)
      //.subscribe((res: any) => {
      //   if (res.accessToken) {
      //     this.router.navigate(['/login']);
      //     this.alertService.mostrarAlertaSimplesPorTipo('success', res.message, '');
      //   }else {
      //     this.alertService.mostrarAlertaSimplesPorTipo('error', res.message, '');
      //   }
      // })

  }

  backLogin() {
    this.router.navigate(['/login']);
  }

}
