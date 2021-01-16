export class fooditem
{
    id:Number;
    food:string;
    service:string
    img:any
    constructor(id,food,service,img){
        this.id=id;
        this.food=food;
        this.service=service;
        this.img=img;
    }
}