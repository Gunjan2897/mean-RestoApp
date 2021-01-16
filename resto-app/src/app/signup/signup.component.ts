import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestoService } from '../resto.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userform: any;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  

  constructor(private formbuilder:FormBuilder, private router:Router,private service:RestoService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.userform = new FormGroup({
      "fullName": new FormControl(null,[Validators.required,Validators.maxLength(10)]),
      "email": new FormControl(null, [Validators.required, Validators.email,Validators.pattern(this.emailRegex)]),
      "password": new FormControl(null,[Validators.required,Validators.minLength(4)]),
      "address": new FormControl(null,[Validators.required,Validators.maxLength(10)]),
      "phone": new FormControl(null,[Validators.required,Validators.minLength(10)])
   
    })
  }
  onSubmit(){
    this.service.SignUpUser(this.userform.value).subscribe(
      res=>{
        this.userform.reset();
        this.toastr.success("Register success!");
        this.router.navigate(['/login']);
        
      }
     
    )
   
  }
  
 
  
}
