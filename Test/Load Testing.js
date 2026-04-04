//// Load Testing (Simulating 10,000 Users)

// FAANG Insight:
// Mention tools like:
// k6
// Artillery

// Talk about:
// connection limits per node
// epoll / event loop scaling


const WebSocket = require('ws');

const TOTAL_CLIENTS = 10000;
let success = 0;

for (let i = 0; i < TOTAL_CLIENTS; i++) {
    const ws = new WebSocket('ws://localhost:8080');

    ws.on('open', () => {
        success++;
        ws.send('hello');

        if (success === TOTAL_CLIENTS) {
            console.log('✅ All clients connected');
        }
    });

    ws.on('error', () => {});
}


