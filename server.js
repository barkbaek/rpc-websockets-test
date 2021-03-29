const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = 3000;

app.use(express.static(__dirname + '/public'));

const WebSocketServer = require('rpc-websockets').Server;
const wss = new WebSocketServer({
    port: 8080,
    host:'localhost'
});

wss.register('message', (params) => {
    console.log(params);
    return "skip";
});

wss.on('connection', (connection) => {
    connection.on('message', (message) => {
        console.log(`message: `);
        console.dir(message);
        const object = JSON.parse(message);
        connection.send(object.params[0]);
    });

    connection.on('close', () => {
        console.log(`connection is closed..`);
    });
});
wss.on('listening', () => {
    console.log(`Server started..`);
});

http.listen(port, () => {
    console.log(`LIstening on ${port}`);
});

process.on('SIGINT', function () {
    wss.close();
});
