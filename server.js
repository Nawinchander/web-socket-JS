const WebSocket = require("ws");

// create websocket server
const server = new WebSocket.Server({ port: 3000 });

// store clients
let clients = [];

server.on("connection", (socket) => {
    console.log("Client connected");

    // add client
    clients.push(socket);

    // receive message
    socket.on("message", (msg) => {
        console.log("Received:", msg.toString());

        // broadcast to all clients
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(msg.toString());
            }
        });
    });

    // remove on close
    socket.on("close", () => {
        console.log("Client disconnected");
        clients = clients.filter(c => c !== socket);
    });
});

console.log("WebSocket server running on port 3000");