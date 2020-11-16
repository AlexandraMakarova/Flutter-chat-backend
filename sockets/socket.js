const { io } = require('../index');
const { checkJWT } = require('../helpers/jwt');
const { userConnected, userDisconnected, saveMessage } = require('../controllers/socket');

//Sockets message
io.on('connection', client => {
    const [valid, userId] = checkJWT(client.handshake.headers['x-token']);
    if(!valid){
      return client.disconnect();
    } 

    userConnected(userId);

    client.join( userId );

    client.on('privat-message',async (payload) => {
      await saveMessage(payload);
      io.to(payload.to).emit('privat-message', payload);
    });

    // client.on('message', (payload) => {
    //     console.log('Mensaje!', payload);

    //     io.emit('server_emited_message', {admin: 'New Message'});
    // });

    client.on('disconnect', () => {
      userDisconnected(userId);
    });
  });