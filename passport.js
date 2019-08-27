const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy;
const {get_user}=require('./controller/user')

passport.use(new LocalStrategy({usernameField:'l_email',passwordField:'l_password'},
    function(username,password,done){
        email=username;
        user=get_user(email);
        if(!user){
            return done(null,false,{message:'wrong userid'})
        }else{
            if(user.password==password){
                return done(null,user)
            }else{
                return done(null,false,{message:'wrong password'})
            }
        }

}))

passport.serializeUser((user,done)=>{
    done(null,user.email)
})
passport.deserializeUser((id,done)=>{
    user=get_user(id)
    done(null,user)
})


module.exports=passport