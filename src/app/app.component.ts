import { Component, OnInit } from '@angular/core';
import { ModalService } from './services/modal.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'store';

  constructor(private modalService: ModalService, private userService: UserService) {
    
  }
  ngOnInit(): void {
  }
}
