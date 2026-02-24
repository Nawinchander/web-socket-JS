const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 5000 });

// store users
let users = {}; // { userId: socket }

wss.on("connection", (ws) => {

    console.log("New connection");

    // when user sends data
    ws.on("message", (msg) => {

        const data = JSON.parse(msg);

        // first message = register user
        if (data.type === "register") {
            users[data.userId] = ws;
            console.log("User registered:", data.userId);
        }

        // private message
        if (data.type === "private") {
            const target = users[data.to];

            if (target && target.readyState === WebSocket.OPEN) {
                target.send(JSON.stringify({
                    from: data.from,
                    message: data.message
                }));
            }
        }
    });

    ws.on("close", () => {
        console.log("Connection closed");

        // remove disconnected user
        for (let id in users) {
            if (users[id] === ws) {
                delete users[id];
            }
        }
    });
});

console.log("Private messaging server running on port 5000");