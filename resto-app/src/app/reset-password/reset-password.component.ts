import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestoService } from '../resto.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  Details: any;

  constructor(private service:RestoService) { }

  ngOnInit(): void {
  }
submit(regForm:NgForm){
  
    let data = regForm.value;
    console.log(data);
    
    this.service.requestPassword(data).subscribe(
      res=>{
           this.Details=res;  
      }
    )
}
}
