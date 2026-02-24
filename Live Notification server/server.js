const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 4000 });

let clients = [];

wss.on("connection", (ws) => {
    console.log("Client connected");
    clients.push(ws);

    ws.on("close", () => {
        console.log("Client disconnected");
        clients = clients.filter(c => c !== ws);
    });
});

// simulate live updates every 3 seconds
setInterval(() => {
    const data = {
        time: new Date().toLocaleTimeString(),
        price: Math.floor(Math.random() * 1000)
    };

    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });

}, 3000);

console.log("Notification server running on port 4000");