let document = "";

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({ document }));

  ws.on('message', (data) => {
    const { op, value, index } = JSON.parse(data);

    if (op === 'insert') {
      document = document.slice(0, index) + value + document.slice(index);
    }

    // Broadcast updated doc
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ document }));
      }
    });
  });
});


