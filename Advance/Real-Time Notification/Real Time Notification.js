const userConnections = new Map(); // userId -> ws

wss.on('connection', (ws, req) => {
  const userId = req.url.split("=")[1];
  userConnections.set(userId, ws);

  ws.on('close', () => {
    userConnections.delete(userId);
  });
});

// Send notification
function notify(userId, payload) {
  const ws = userConnections.get(userId);
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(payload));
  }
}

