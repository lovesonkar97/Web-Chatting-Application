const user={
    'one@user.com':{
        name:'one',
        email:'one@user.com',
        password:'onepass'
    },

    'two@user.com':{
        name:'two',
        email:'two@user.com',
        password:'twopass'
    },

    'three@user.com':{
        name:'three',
        email:'three@user.com',
        password:'threepass'
    }
}

module.exports={
    get_user:(email)=>{
        return user[email]
    },

    create_user:(s_email,s_name,s_age,s_password)=>{
        if(user[s_email]){
            return false;
        }
        user[s_email]={
        name:s_name,
        email:s_email,
        age:s_age,
        password:s_password
        }
        return user;
    }
}