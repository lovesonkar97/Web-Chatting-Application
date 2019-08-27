const express=require('express')
const route=express.Router()

route.get('/',(req,res)=>{
        if(req.user){
            return res.redirect('/chat');
        }else{
            return res.render('login_signup',{title:`login/signup`})
        }
})
route.use('/login',require('./login'))
route.use('/signup',require('./signup'))

module.exports=route