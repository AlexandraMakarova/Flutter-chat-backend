const { io } = require('../index');

//Sockets message
io.on('connection', client => {
    console.log('Client conected');

    client.on('disconnect', () => { console.log('Client disconected') });

    // client.on('message', (payload) => {
    //     console.log('Mensaje!', payload);

    //     io.emit('server_emited_message', {admin: 'New Message'});
    // });
  });