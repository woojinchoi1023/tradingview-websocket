const express = require("express");
const WebSocket = require("ws");

const app = express();
const PORT = 3001;

// HTTP 서버 설정
app.get("/", (req, res) => {
  res.send("WebSocket Server is running");
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

// WebSocket 서버 설정
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  // 일정 시간 간격으로 가짜 주가 데이터 전송
  const sendStockData = () => {
    const fakeStockData = {
      time: Math.floor(Date.now() / 1000), // Unix timestamp
      open: parseFloat((Math.random() * 10 + 100).toFixed(2)),
      high: parseFloat((Math.random() * 10 + 105).toFixed(2)),
      low: parseFloat((Math.random() * 10 + 95).toFixed(2)),
      close: parseFloat((Math.random() * 10 + 100).toFixed(2)),
    };
    ws.send(JSON.stringify(fakeStockData));
  };

  const interval = setInterval(sendStockData, 1000);

  ws.on("close", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});
