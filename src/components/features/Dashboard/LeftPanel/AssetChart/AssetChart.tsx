import { useRef, useEffect, useContext } from "react";
import * as d3 from "d3";
import styles from "./AssetChart.module.css";
import { useFetchData } from "../SearchAssets/useFetchData";
import { useLiveData } from "../../../../../hooks/useLiveData";
import { AssetContext, TimeRange } from "../../../../../context/AssetContext";

// Define the candlestick data structure
type CandlestickData = {
  time: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

// Define kline API return type
type KlineData = [
  number, // Open time
  string, // Open
  string, // High
  string, // Low
  string, // Close
  string, // Volume
  number, // Close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string // Ignore
];

const AssetChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { assetData, selectedAsset, timeRange, setTimeRange } =
    useContext(AssetContext);

  // Get kline (candlestick) data from REST API
  const getInterval = (): [string, Record<string, string>] => {
    if (!selectedAsset) return ["klines", {}];

    switch (timeRange) {
      case "24h":
        return [
          "klines",
          { symbol: `${selectedAsset}USDT`, interval: "15m", limit: "96" },
        ]; // 15m * 96 = 24h
      case "1w":
        return [
          "klines",
          { symbol: `${selectedAsset}USDT`, interval: "2h", limit: "84" },
        ]; // 2h * 84 = 7d
      case "1m":
        return [
          "klines",
          { symbol: `${selectedAsset}USDT`, interval: "8h", limit: "90" },
        ]; // 8h * 90 = 30d
      case "6m":
        return [
          "klines",
          { symbol: `${selectedAsset}USDT`, interval: "1d", limit: "180" },
        ]; // 1d * 180 = 6m
      case "1y":
        return [
          "klines",
          { symbol: `${selectedAsset}USDT`, interval: "3d", limit: "121" },
        ]; // 3d * 121 ≈ 1y
      case "all":
        return [
          "klines",
          { symbol: `${selectedAsset}USDT`, interval: "1w", limit: "200" },
        ]; // 1w * 200 = ~4 years
      default:
        return [
          "klines",
          { symbol: `${selectedAsset}USDT`, interval: "15m", limit: "96" },
        ];
    }
  };

  const [endpoint, params] = getInterval();
  const { data: klineData, loading, error } = useFetchData(endpoint, params);
  const { liveData, isConnected } = useLiveData();

  // Process kline data into a format for D3
  const processKlineData = (): CandlestickData[] => {
    if (!klineData || !Array.isArray(klineData) || klineData.length === 0)
      return [];

    return klineData.map((kline: KlineData) => ({
      time: new Date(kline[0]), // Open time
      open: parseFloat(kline[1]),
      high: parseFloat(kline[2]),
      low: parseFloat(kline[3]),
      close: parseFloat(kline[4]),
      volume: parseFloat(kline[5]),
    }));
  };

  // Find the live data for the current symbol to update the latest candle
  const getLivePrice = () => {
    if (!liveData || !selectedAsset) return null;

    const tickerSymbol = `${selectedAsset}USDT`;
    const ticker = liveData.find((t) => t.s === tickerSymbol);
    return ticker ? parseFloat(ticker.c) : null;
  };

  // Draw the chart using D3
  useEffect(() => {
    if (!chartRef.current || !selectedAsset || loading || error) return;

    // Process the data
    const candleData = processKlineData();
    if (candleData.length === 0) return;

    // Update the latest candle with live data if available
    const livePrice = getLivePrice();
    if (livePrice && candleData.length > 0) {
      const latestCandle = candleData[candleData.length - 1];
      latestCandle.close = livePrice;
      latestCandle.high = Math.max(latestCandle.high, livePrice);
      latestCandle.low = Math.min(latestCandle.low, livePrice);
    }

    // Clear previous chart
    d3.select(chartRef.current).selectAll("*").remove();

    // Set up dimensions
    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const width = chartRef.current.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X scale using time
    const x = d3
      .scaleTime()
      .domain(
        d3.extent(candleData, (d: CandlestickData) => d.time) as [Date, Date]
      )
      .range([0, width]);

    // Y scale using price
    const y = d3
      .scaleLinear()
      .domain([
        (d3.min(candleData, (d: CandlestickData) => d.low) as number) * 0.995,
        (d3.max(candleData, (d: CandlestickData) => d.high) as number) * 1.005,
      ] as [number, number])
      .range([height, 0]);

    // Add X axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .attr("class", styles.axis);

    // Add Y axis
    svg.append("g").call(d3.axisLeft(y)).attr("class", styles.axis);

    // Calculate the width of each bar
    const barWidth = Math.max(1, (width / candleData.length) * 0.8);

    // Draw candlesticks
    svg
      .selectAll(".candle")
      .data(candleData)
      .enter()
      .append("line")
      .attr("x1", (d: CandlestickData) => x(d.time) as number)
      .attr("x2", (d: CandlestickData) => x(d.time) as number)
      .attr("y1", (d: CandlestickData) => y(d.low))
      .attr("y2", (d: CandlestickData) => y(d.high))
      .attr("stroke", (d: CandlestickData) =>
        d.open > d.close ? "#ff5555" : "#55aa55"
      )
      .attr("stroke-width", 1);

    // Draw candle bodies
    svg
      .selectAll(".candleBody")
      .data(candleData)
      .enter()
      .append("rect")
      .attr("x", (d: CandlestickData) => (x(d.time) as number) - barWidth / 2)
      .attr("y", (d: CandlestickData) => y(Math.max(d.open, d.close)))
      .attr("width", barWidth)
      .attr("height", (d: CandlestickData) => Math.abs(y(d.open) - y(d.close)))
      .attr("fill", (d: CandlestickData) =>
        d.open > d.close ? "#ff5555" : "#55aa55"
      )
      .attr("stroke", "none");

    // Add price line for current price
    if (livePrice) {
      svg
        .append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", y(livePrice))
        .attr("y2", y(livePrice))
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "3,3");

      // Price label
      svg
        .append("text")
        .attr("x", width - 5)
        .attr("y", y(livePrice) - 5)
        .attr("text-anchor", "end")
        .attr("fill", "#ffffff")
        .text(
          `$${livePrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        );
    }

    // Update on window resize
    const handleResize = () => {
      if (chartRef.current) {
        // Redraw chart on resize
        d3.select(chartRef.current).selectAll("*").remove();
        // We would call the drawing logic again here
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [klineData, liveData, selectedAsset, timeRange]);

  // Handle time range selection
  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
  };

  if (!selectedAsset) {
    return (
      <div className={styles.noAssetSelected}>
        Select an asset to view chart
      </div>
    );
  }

  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <h3>Price Chart</h3>
        {isConnected && <span className={styles.liveBadge}>Live</span>}
      </div>

      <div ref={chartRef} className={styles.chart}>
        {loading && <div className={styles.loader}>Loading chart...</div>}
        {error && <div className={styles.error}>Error loading chart data</div>}
      </div>

      <div className={styles.timeRangeSelector}>
        {(["24h", "1w", "1m", "6m", "1y", "all"] as TimeRange[]).map(
          (range) => (
            <button
              key={range}
              className={`${styles.timeButton} ${
                timeRange === range ? styles.active : ""
              }`}
              onClick={() => handleTimeRangeChange(range)}
            >
              {range}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default AssetChart;
