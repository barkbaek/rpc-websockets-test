const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
    console.log(`Websocket opened2`);
};

ws.onmessage = (message) => {
    console.log(`on message - data:`);
    console.dir(message);
};

ws.onerror = (err) => {
    console.log("Got error", err);
};

ws.onclose = () => {
    console.log(`Websocket closed`);
};

const message = document.querySelector('#message');
const send = document.querySelector('#send');

send.addEventListener("click", (event) => {
    let m = message.value;
    ws.send(JSON.stringify( {"jsonrpc": "2.0", "method": "message", "params": [ m ], "id": "1"} ));
});