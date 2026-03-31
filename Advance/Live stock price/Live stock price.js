function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Simulate stock updates
setInterval(() => {
  const stock = {
    symbol: "AAPL",
    price: (Math.random() * 200).toFixed(2)
  };
  broadcast(stock);
}, 100);


