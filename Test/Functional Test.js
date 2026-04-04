// Functional Test (Connection + Messaging)

// What interviewer expects:
// Validate protocol correctness
// Handle JSON schema validation
// Mention contract testing

const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
    console.log('Connected');

    ws.send(JSON.stringify({ type: 'PING' }));
});

ws.on('message', (data) => {
    const msg = JSON.parse(data);
    
    if (msg.type === 'PONG') {
        console.log('✅ Functional Test Passed');
    } else {
        console.log('❌ Unexpected response');
    }
});

