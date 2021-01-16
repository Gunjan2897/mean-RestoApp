const mongoose = require('mongoose');
const User = mongoose.model('User');
const  jwt = require('jsonwebtoken');
const bycrpt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();



module.exports.register = (req,res,next)=>{
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.address= req.body.address;
    user.phone = req.body.phone;
    user.save((err,doc)=>{
        if(!err){
            res.send(doc);
        }else{
           if(err.code==11000){
               res.status(422).send(['Duplicate email address found']);
           }else{
               return next(err);
           }
        }

    });
    
}

module.exports.authenticate=(req,res)=>{
    User.find({email:req.body.email}).then(user=>{
        
        bycrpt.compare(req.body.password,user[0].password,(err,result)=>
        {
            if(err)
            {
                return res.status(401).json({
                    message:"authentication Failed!"
                });
            }
            else if(result)
            {
        
                const token = jwt.sign(
                    {data:user},'SECRET#123',{
                    expiresIn:"1h"
                });
                return res.status(200).json({
                    message:"Authentication has successfully done!",
                    token:token
                });
            }else{
                res.status(401).json({
                    message:"authentication Failed"
                });
            }
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    }) ;
}

module.exports.userProfile=(req,res,next)=>{
    
    User.findOne({_id:req._id['_id']},
      
          (err,user)=>{
            if (!user)
            return res.status(404).json({ status: false, message: 'User record not found.' });
        else
      //  console.log(user);
            return res.status(200).json({ status: true, user : user });
            
              
          }
        );
}

module.exports.updateProfile=(req,res)=>{
   // console.log(req.params.id);
    User.findOneAndUpdate({_id:req.params.id},req.body,(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    });
}

module.exports.forgot=(req,res)=>{
   
    User.findOne({email:req.body.email},(err,user)=>{
        
        var transporter=nodemailer.createTransport({
            service:'Gmail',
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASS
            }
        });
        var mailOptions={
            from:'sln.gunjan1997@gmail.com',
            to:req.body.email,
            subject:'password Reset',
            html:"<h1>welcome user!</h1>"
        }

        transporter.sendMail(mailOptions,(err,data)=>{
            if(err){
                console.log('error Occurs');
            }else{
                console.log('email sent!!');
            }
        });
        
    })

}
