// socket.js
let ioInstance = null;

module.exports = {
  init: function(server) {
    const { Server } = require('socket.io');
    ioInstance = new Server(server, {
      cors: {
        origin: 'http://localhost:4200',
        credentials: true
      }
    });
    return ioInstance;
  },
  getIO: function() {
    if (!ioInstance) {
      throw new Error('Socket.io no ha sido inicializado!');
    }
    return ioInstance;
  }
};