import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

function App() {
  const chartContainerRef = useRef(null);
  const candlestickSeriesRef = useRef(null);

  useEffect(() => {
    // 차트 생성
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    candlestickSeriesRef.current = candlestickSeries;

    // WebSocket 연결 설정
    const socket = new WebSocket("ws://localhost:3001");

    socket.onmessage = (event) => {
      const stockData = JSON.parse(event.data);

      // 수신된 데이터를 차트에 업데이트
      console.log(stockData);
      candlestickSeriesRef.current.update(stockData);
    };

    return () => {
      socket.close();
      chart.remove();
    };
  }, []);

  return (
    <div>
      <h1>실시간 주가 차트</h1>
      <div ref={chartContainerRef} style={{ width: "100%", height: "300px" }} />
    </div>
  );
}

export default App;
