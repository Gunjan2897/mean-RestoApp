import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestoService } from '../resto.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  allitems: any;

  constructor(private rs:RestoService , public router:Router) { }
 cartlist:any
  ngOnInit(): void {
    
    this.rs.getCartItemslist().subscribe(             //for getting list of cartitems........
      response=>{
        this.cartlist = response;
      }
    )
  }
  PlaceOrder(){
    alert("your order placed sucessfully!");
    this.router.navigate(['/home']);
  }
  
  deleteitems(id){
    if(confirm("are you sure"))
    {
    this.rs.deleteitems(id).subscribe(cart=>{
      this.ngOnInit();
    
    })
  }
  }
}
