//// Fault Injection Test (Server Crash Simulation)

// FAANG Insight:
// Discuss:
// At-least-once vs exactly-once delivery
// Idempotency keys
// Distributed recover


const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
    console.log('Connected');

    // simulate critical request
    ws.send(JSON.stringify({ type: 'IMPORTANT_EVENT' }));
});

ws.on('close', () => {
    console.log('❌ Server crashed or connection lost');

    // retry logic
    setTimeout(() => {
        console.log('Retrying...');
    }, 2000);
});




