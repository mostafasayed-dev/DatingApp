import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe(response => {
      // console.log(response);
      this.cancel();
    }, error => {
      console.log(error);
    })
  }

  cancel(){
    //console.log('cancelled');
    this.cancelRegister.emit(false);
  }

}
