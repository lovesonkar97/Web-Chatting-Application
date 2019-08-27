var socket=io();
window.onload=()=>{
    $('form').submit((e)=>{
        e.preventDefault();
        socket.emit('message',$('#chat_input').val())
        $('#chat_input').val("")
    })
        $('#ou_list').on('click','li a',((e)=>{
            socket.emit('change_receiver',e.currentTarget.id);
        }))
}

    socket.on('connect',()=>{
        console.log(socket.id)
    })
    socket.on('message_g',(msg)=>{
            $('#chat_list').append($('<li>').text(msg.sender+' : '+msg.message));
    })

socket.on('refresh_ou_list',(ou)=>{
   var ou_list= document.getElementById('ou_list')
   var li=document.createElement('li');
   var a=document.createElement('a');
   ou_list.innerHTML="";
    Object.keys(ou).forEach(element=>{
        if(ou[element].from!=socket.id){
            $('#ou_list').append($('<li>').append($('<a>').text(element).attr({href:'#',id:ou[element].from})));
        }else{
            if(Object.keys(ou).length==1){
            $('#ou_list').append($('<li>').append($('<a>').text('no online user').attr({href:'#',id:'no online user'}))); 
            }
        }
    })
})
    
