let gameState = { players: {} };

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const { playerId, position } = JSON.parse(data);

    gameState.players[playerId] = position;

    // Broadcast updated state
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(gameState));
      }
    });
  });
});

