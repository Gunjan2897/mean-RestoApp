import { Component, OnInit } from '@angular/core';
import { categories } from '../categories';
import { RestoService } from '../resto.service';
import {fooditem} from '../food';

@Component({
  selector: 'app-resto-services',
  templateUrl: './resto-services.component.html',
  styleUrls: ['./resto-services.component.css']
})
export class RestoServicesComponent implements OnInit {
  item: any;
  cart: any;
  getcart: any;
  allcartitem: any;
  data:any;
  

  constructor(private service:RestoService) { }
  categories:categories[]=[];
  categoriesSelected:Number;
  listFood:fooditem[];
  ngOnInit(): void {   


    this.service.getCategoryitems().subscribe
   (
     (response)=>{
       this.categories = response;
     },


   )

   this.service.addcartitem().subscribe(
     (response)=>{
       this.getcart=response;
     }
   )
  }

  oncategoriesSelected(selectedCategoryId:any):void{
    this.service.getFooditemsbycatid(selectedCategoryId).subscribe
    (
      (response)=>{
       
        
        this.listFood = response;
        console.log(this.listFood);
        
        this.item=this.listFood[0]['categories'];
      }
    )

  }

  addcart(id){
        this.ngOnInit()
         //console.log(id);
         this.cart = this.item.filter(
           res=>res.id==id
           
         )
         //console.log(this.getcart);
         this.allcartitem = this.getcart.filter(
           res=>res.id==id
         )
        // console.log(this.cart);
         
        // console.log(this.allcartitem);
        if(this.allcartitem.length!==0){
          alert("allready in cart");
        }else{
          this.data = {
               id:this.cart[0].id,
               food:this.cart[0].food,
               service:this.cart[0].service,
               price:this.cart[0].price,
               img:this.cart[0].img
              
             } 
             alert("Added");
             this.service.addToCart(this.data).subscribe(
               response=>{
                 console.log(response);
                 this.cart=response;
                 
               }
            )

        }   
  }
  }
   
