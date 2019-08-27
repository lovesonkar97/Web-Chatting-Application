const express=require('express')
const route=express.Router()
const passport=require('../passport')


route.get('/',(req,res)=>{
    if(req.user){
        return res.redirect('/chat');
    }else{
        return res.redirect('/');
    }
})

route.post('/',passport.authenticate('local'),(req,res)=>{
    if(req.user){
        return res.redirect('/chat');
    }else{
        return res.redirect('/');
    }
})

module.exports=route