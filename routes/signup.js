const express=require('express')
const route=express()
const {create_user}=require('../controller/user')

route.get('/',(req,res)=>{
    if(req.user){
        return res.redirect('/chat');
    }else{
        return res.redirect('/');
    }
})

route.post('/',(req,res)=>{
    var user=create_user(req.body.s_email,req.body.s_name,req.body.s_age,req.body.s_password);
    return res.redirect('/');
})

module.exports=route