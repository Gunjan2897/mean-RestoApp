import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import {categories} from './categories';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestoService {

  constructor(private http:HttpClient) { }
  url:string ="http://localhost:3000/categories";
  
  ///for get categories....
  getCategoryitems(){
    return this.http.get<categories[]>(this.url);
  }
  

  //for filtering food from categories.....
  getFooditemsbycatid(selectedcategoryId:string):Observable<any>
  {
     let params1 = new HttpParams().set('id',selectedcategoryId);
     return this.http.get("http://localhost:4000/fooditem",{params:params1});
  }

  //for add to cart......
  addToCart(data){
     return this.http.post("http://localhost:3000/cart",data);
  }
  
  //for get cart values for addtocart....
  addcartitem(){
    return this.http.get("http://localhost:3000/cart")
  }

  //for listing all cartitem on cart.....
  getCartItemslist(){
    return this.http.get("http://localhost:3000/cart");
  }
  //for delete items...
  deleteitems(id){
    return this.http.delete("http://localhost:3000/cart/"+id)

  }
 
  SignUpUser(user){
    return this.http.post("http://localhost:8000/api"+'/register',user)
   }
   loginUser(data){
    return this.http.post("http://localhost:8000/api"+'/authenticate',data);
  }
  getUserProfile(){
    return this.http.get("http://localhost:8000/api"+'/userProfile');
  }

  setToken(token){
    localStorage.setItem('token',token);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  deleteToken(){
    localStorage.removeItem('token')
  }
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }
  isLoggedIn(){
    var userPayload=this.getUserPayload();
    if(userPayload)
    return userPayload.exp > Date.now()/1000;
    else
    return false;
  }
  updateUser(id,data){
    return this.http.put("http://localhost:8000/api"+'/updateProfile/'+id ,data);
  }

  requestPassword(email){
    return this.http.get("http://localhost:8000/api"+'/forgot/'+email);
  }
}


