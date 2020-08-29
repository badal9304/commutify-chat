// Node server which will handle socket io connection
const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket =>{                      //listen the multiple socket connection.
    socket.on('new-user-joined', name=>{                //handle the paricular connection
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);     //It will tell all the users that new user is joined, like Nitin joined the chat.
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})