Deno.serve((req) => {
  if (req.headers.get("upgrade") === "websocket") {
    const { socket, response } = Deno.upgradeWebSocket(req);
    socket.addEventListener("message", (event) => {
      console.log(`Received: ${event.data}`);
      broadcast(event.data);
    });
    return response;
  }
  return new Response("WebSocket server is running");
});

const clients = new Set<WebSocket>();

function broadcast(message: string) {
  for (const client of clients) {
    client.send(message);
  }
}
