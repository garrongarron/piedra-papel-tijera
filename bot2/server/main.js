const express = require('express')
const app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', process.env.PORT || 3000)

app.use(express.static('public'))


io.on('connection', function (socket) {
  // console.log('alguien se ha conectado con sockets');
  socket.emit('messages', 'The game start!');
  // socket.on('new-message', function (data) {
  // 	messages.push(data);
  // 	io.sockets.emit('messages', messages);
  // })
});


server.listen(app.get('port'), function () {//https5
  console.log("https server listening on port http://localhost:" + app.get('port'));
});

const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: 'SamuGarron',
    password: 'oauth:12345678912345678912345678'
  },
  channels: [
    "SamuGarron"
  ],
  options: {
    debug: true
  }
};
// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
/**
 * [
 *   {
 *     "target": "#xxxxxxxx",
 *     "context": {
 *       "badge-info": null,
 *       "badges": {
 *         "broadcaster": "1"
 *       },
 *       "client-nonce": "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
 *       "color": "#0000FF",
 *       "display-name": "TwitchNamexxx",
 *       "emotes": null,
 *       "flags": null,
 *       "id": "xxxxxxx-0x0x-0x0x-0x0x-xxxxxxxxxxxx",
 *       "mod": false,
 *       "room-id": "123456789",
 *       "subscriber": false,
 *       "tmi-sent-ts": "123456789",
 *       "turbo": false,
 *       "user-id": "123456789",
 *       "user-type": null,
 *       "emotes-raw": null,
 *       "badge-info-raw": null,
 *        "badges-raw": "broadcaster/1",
 *        "username": "twitchnamexxx",
 *        "message-type": "chat"
 *     },
 *     "msg": "Hello",
 *     "self": false
 *   }
 * ]
 */
function onMessageHandler(target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot
  // Remove whitespace from chat message
  const commandName = msg.trim();

  //context.username ===> @samuGarron
  // If the command is known, let's execute it
  if (commandName === '!dice') {
    client.say(target, `You rolled a 1`);
    console.log(`* Executed ${commandName} command`);
  }
  io.sockets.emit('messages', {
    author: context['display-name'],
    id: context['user-id'],
    text: commandName,
  });
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
