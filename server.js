const express=require('express')
const app=express();
const session=require('express-session')
const passport=require('./passport')
const http=require('http')
const socketio=require('socket.io')

let online_users={}

app.set('view engine','hbs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const server=http.createServer(app)
const io=socketio(server)

app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:'some_secret',
    cookie:{originalMaxAge:24*60*60*1000}
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/public',express.static(__dirname + '/public_static'))

app.get('/chat',(req,res)=>{
    if(req.user){
        let user=req.user;
        return res.render('chat',{title:'chat'})
    }else{
        res.redirect('/')
    }
})

io.on('connection',(socket)=>{
    console.log(socket.id)
    online_users[user.email]={from:socket.id,to:null};
    console.log(online_users)
    socket.on('message',(msg)=>{
        var receiver;
        var sender_name;
        Object.keys(online_users).forEach(element=>{
            if(online_users[element].from==socket.id){
                receiver=online_users[element].to;
                sender_name=element;
            }
        })
        if(receiver!=null){
            io.to(receiver).emit('message_g',{message:msg,sender:sender_name})
        }else{
            io.to(socket.id).emit('message_g',{message:'no user',sender:'::::'})
        }
    })
    socket.on('disconnect',()=>{
        console.log(socket.id + " disconnected")
        Object.keys(online_users).forEach(element => {
            if(online_users[element].to==socket.id){
                online_users[element].to=null;
            }
            if(online_users[element].from==socket.id){
                delete online_users[element];
            }

        });
        io.emit('refresh_ou_list',online_users)
    })
    socket.on('change_receiver',(sid)=>{
        var receiver;
        var sender;
        Object.keys(online_users).forEach(element=>{
            if(online_users[element].from==sid){
                receiver=element;
            }
            if(online_users[element].from==socket.id){
                sender=element;
            }
        })
        console.log('sender : '+sender)
        console.log('receiver : '+receiver)
        if(receiver!=null){
            online_users[sender].to=sid;
        }else{
            online_users[sender].to=null;
        }
    })
    io.emit('refresh_ou_list',online_users)
})
setInterval(()=>{
    io.emit('refresh_ou_list',online_users)
},10000)
app.use('/',require('./routes'))

server.listen(2222,()=>{
    console.log('http://localhost:2222')
})