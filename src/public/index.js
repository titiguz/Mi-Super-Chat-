let socket = io()
let chatBox = document.getElementById("chatBox");
let log = document.getElementById("log");
let user;
//ALERT DE IDENTIFICACIÓN
Swal.fire({
 title:"identifícate :)",
 input:"text",
 allowOutsideClick:false, //no me voy sin identificarme
 inputValidator:(value)=>{
     console.log(value)
     return !value && "¡Necesitas escribir tu nombre para participar en el chat!"
 }
}).then(result=>{
    user= result.value;
})

chatBox.addEventListener("keyup",evt=>{
    if(evt.key==="Enter"){
        if(chatBox.value.trim().length>0){//por lo menos se envia un simbolo
            socket.emit("message",{user,message:chatBox.value.trim()})
        chatBox.value="";
        }
    }
})

//sockets

socket.on('log',data=>{
    let messages="";
    data.forEach(log=>{
        messages=messages+`${log.user} dice: ${log.message}</br>`
    })
    log.innerHTML=messages;
})
