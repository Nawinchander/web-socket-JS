/// Reconnection & Reliability Test

// FAANG Insight:
// Talk about:
// Exponential backoff
// Session recovery
// Message replay (Kafka)

const WebSocket = require('ws');

function connect() {
    const ws = new WebSocket('ws://localhost:8080');

    ws.on('open', () => {
        console.log('Connected');
    });

    ws.on('close', () => {
        console.log('Disconnected. Reconnecting...');
        setTimeout(connect, 1000);
    });

    ws.on('error', () => {
        ws.close();
    });
}

connect();

