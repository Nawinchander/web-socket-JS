const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const rooms = new Map(); // roomId -> Set of clients

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const { type, roomId, message } = JSON.parse(data);

    if (type === 'join') {
      if (!rooms.has(roomId)) rooms.set(roomId, new Set());
      rooms.get(roomId).add(ws);
      ws.roomId = roomId;
    }

    if (type === 'message') {
      rooms.get(roomId)?.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ message }));
        }
      });
    }
  });

  ws.on('close', () => {
    rooms.get(ws.roomId)?.delete(ws);
  });
});


