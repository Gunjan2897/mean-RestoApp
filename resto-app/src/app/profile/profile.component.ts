import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestoService } from '../resto.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails: any;

  constructor(private service:RestoService,private router:Router) { }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      res=>{
        this.userDetails=res['user']
      },err=>{console.log(err);
      }
    );
  }
 onLogout(){
   this.service.deleteToken();
   this.router.navigate(['/login']);
 }
}
