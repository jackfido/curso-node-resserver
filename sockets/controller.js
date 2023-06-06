const { Socket } = require("socket.io");
const { checkJWT } = require("../helpers");
const {ChatMessages} = require('../models');

const chatMessages = new ChatMessages();

const socketController = async(socket = new Socket(), io) => {
    //console.log('Client Connected', socket.handshake.headers['x-token']);
    
    const user = await checkJWT(socket.handshake.headers['x-token']);

    if (!user) {
        // console.log('User disconnected', user.name);
        return socket.disconnect();
    }

    // console.log('User connected', user.name);
    chatMessages.connectUser(user);
    io.emit('usuarios-activos', chatMessages.usersArr);
    socket.emit('recibir-mensajes', chatMessages.last10Messages);
    socket.join(user.id);

    // Limpiar cuando alguien se desconecte
    socket.on('disconnect', () => {
        //console.log('disconnected');
        chatMessages.disconnectUser(user.id);
        io.emit('usuarios-activos', chatMessages.usersArr);
        socket.disconnect();
    });

    socket.on('enviar-mensaje', ({uid, message}) => {
        if (uid) {
            socket.to(uid).emit('mensajes-privado',{from: user.name, message});
        } else {
            chatMessages.sendMessages(user.id, user.name, message);
            io.emit('recibir-mensajes', chatMessages.last10Messages)
        }

    });
};

module.exports = {
    socketController
}