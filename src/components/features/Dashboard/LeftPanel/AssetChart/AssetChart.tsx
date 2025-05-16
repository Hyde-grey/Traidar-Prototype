import { useRef, useEffect, useContext, useState, useCallback } from "react";
import * as d3 from "d3";
import styles from "./AssetChart.module.css";
import { useFetchData } from "../../../../../hooks/useFetchData";
import { useLiveData } from "../../../../../hooks/useLiveData";
import { AssetContext, TimeRange } from "../../../../../context/AssetContext";
import { FadeInMotion } from "../../../../../components/common";
import { AnimatePresence } from "framer-motion";

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
  const { selectedAsset, timeRange, setTimeRange } = useContext(AssetContext);
  const [retryCount, setRetryCount] = useState(0);
  const [chartDimensions, setChartDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isResizing, setIsResizing] = useState(false);

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

  // Auto-retry on error
  useEffect(() => {
    if (error && retryCount < 3) {
      const timer = setTimeout(() => {
        setRetryCount((count) => count + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error, retryCount]);

  // Reset retry count when selectedAsset or timeRange changes
  useEffect(() => {
    setRetryCount(0);
  }, [selectedAsset, timeRange]);

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

  // Calculate chart dimensions based on container size
  const updateChartDimensions = useCallback(() => {
    if (!chartRef.current) {
      console.warn("Chart ref is not available for dimension calculation");
      return;
    }

    const containerWidth = chartRef.current.clientWidth;
    if (containerWidth <= 0) {
      console.warn("Chart container has zero width, using default dimensions");
      // Set minimal default dimensions
      setChartDimensions({
        width: 300,
        height: 200,
      });

      // Try again shortly (container might need time to initialize)
      setTimeout(() => {
        if (chartRef.current && chartRef.current.clientWidth > 0) {
          updateChartDimensions();
        }
      }, 500);
      return;
    }

    // For mobile, make chart more compact but still usable
    let chartHeight = 400; // Default for desktop

    // Responsive height calculation
    if (containerWidth < 375) {
      chartHeight = 200; // Extra small screens
    } else if (containerWidth < 576) {
      chartHeight = 250; // Small screens
    } else if (containerWidth < 768) {
      chartHeight = 300; // Medium screens
    } else if (containerWidth < 992) {
      chartHeight = 350; // Large screens
    }

    setChartDimensions({
      width: containerWidth,
      height: chartHeight,
    });
  }, []);

  // Initialize dimensions
  useEffect(() => {
    updateChartDimensions();

    // Set up resize observer for responsive chart
    const resizeObserver = new ResizeObserver(() => {
      setIsResizing(true);
      updateChartDimensions();
      // Small delay to prevent too many redraws while resizing
      setTimeout(() => setIsResizing(false), 100);
    });

    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateChartDimensions]);

  // Add Intersection Observer to detect when chart is visible
  useEffect(() => {
    if (!chartRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isNowVisible = entries[0].isIntersecting;

        // If chart becomes visible and we have data, redraw it
        if (
          isNowVisible &&
          !loading &&
          !error &&
          !isResizing &&
          selectedAsset
        ) {
          drawChart();
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% is visible
    );

    observer.observe(chartRef.current);

    return () => {
      if (chartRef.current) observer.unobserve(chartRef.current);
    };
  }, [selectedAsset, loading, error, isResizing]);

  // Draw the chart using D3
  const drawChart = useCallback(() => {
    if (!chartRef.current) {
      console.warn("Chart ref is not available");
      return;
    }

    if (!selectedAsset) {
      console.warn("No asset selected");
      return;
    }

    if (loading) {
      console.log("Chart data is still loading");
      return;
    }

    if (error) {
      console.error("Chart data error:", error);
      return;
    }

    if (isResizing) {
      console.log("Chart is resizing, will redraw when finished");
      return;
    }

    // Check for valid dimensions
    if (chartDimensions.width <= 0 || chartDimensions.height <= 0) {
      console.warn("Invalid chart dimensions:", chartDimensions);
      // Force dimension update
      updateChartDimensions();
      return;
    }

    // Process the data
    const candleData = processKlineData();
    if (!candleData || candleData.length === 0) {
      console.warn("No candle data available for chart");

      // Clear previous chart and show message
      if (chartRef.current) {
        d3.select(chartRef.current)
          .selectAll("*")
          .remove();

        const { width, height } = chartDimensions;
        const svg = d3
          .select(chartRef.current)
          .append("svg")
          .attr("width", width)
          .attr("height", height);

        svg
          .append("text")
          .attr("x", width / 2)
          .attr("y", height / 2)
          .attr("text-anchor", "middle")
          .attr("fill", "#6C757D")
          .text("No chart data available");
      }
      return;
    }

    // Update the latest candle with live data if available
    const livePrice = getLivePrice();
    if (livePrice && candleData.length > 0) {
      const latestCandle = candleData[candleData.length - 1];
      latestCandle.close = livePrice;
      latestCandle.high = Math.max(latestCandle.high, livePrice);
      latestCandle.low = Math.min(latestCandle.low, livePrice);
    }

    try {
      // Clear previous chart
      d3.select(chartRef.current)
        .selectAll("*")
        .remove();

      const { width, height } = chartDimensions;

      // Adjust margins based on screen size
      const isMobile = width < 576;
      const margin = {
        top: 20,
        right: isMobile ? 15 : 30,
        bottom: 30,
        left: isMobile ? 40 : 60,
      };

      const chartWidth = width - margin.left - margin.right;
      const chartHeight = height - margin.top - margin.bottom;

      // Create SVG
      const svg = d3
        .select(chartRef.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // X scale using time
      const x = d3
        .scaleTime()
        .domain(
          d3.extent(candleData, (d: CandlestickData) => d.time) as [Date, Date]
        )
        .range([0, chartWidth]);

      // Y scale using price
      const y = d3
        .scaleLinear()
        .domain([
          (d3.min(candleData, (d: CandlestickData) => d.low) as number) * 0.995,
          (d3.max(candleData, (d: CandlestickData) => d.high) as number) *
            1.005,
        ] as [number, number])
        .range([chartHeight, 0]);

      // Simplify x-axis for mobile
      const xAxis = isMobile
        ? d3
            .axisBottom(x)
            .ticks(4)
            .tickSizeOuter(0)
        : d3.axisBottom(x).tickSizeOuter(0);

      // Simplify y-axis for mobile
      const yAxis = isMobile
        ? d3
            .axisLeft(y)
            .ticks(5)
            .tickSizeOuter(0)
        : d3.axisLeft(y).tickSizeOuter(0);

      // Add X axis
      svg
        .append("g")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(xAxis)
        .attr("class", styles.axis);

      // Add Y axis
      svg
        .append("g")
        .call(yAxis)
        .attr("class", styles.axis);

      // Calculate the width of each bar, adjusted for mobile
      const dataCount = candleData.length;
      const barWidth = Math.max(
        1,
        (chartWidth / dataCount) * (isMobile ? 0.7 : 0.8)
      );

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
        .attr("stroke-width", isMobile ? 0.8 : 1);

      // Draw candle bodies
      svg
        .selectAll(".candleBody")
        .data(candleData)
        .enter()
        .append("rect")
        .attr("x", (d: CandlestickData) => (x(d.time) as number) - barWidth / 2)
        .attr("y", (d: CandlestickData) => y(Math.max(d.open, d.close)))
        .attr("width", barWidth)
        .attr("height", (d: CandlestickData) =>
          Math.abs(y(d.open) - y(d.close))
        )
        .attr("fill", (d: CandlestickData) =>
          d.open > d.close ? "#ff5555" : "#55aa55"
        )
        .attr("stroke", "none");

      // Add price line for current price
      if (livePrice) {
        svg
          .append("line")
          .attr("x1", 0)
          .attr("x2", chartWidth)
          .attr("y1", y(livePrice))
          .attr("y2", y(livePrice))
          .attr("stroke", "#ffffff")
          .attr("stroke-width", 1)
          .attr("stroke-dasharray", "3,3");

        // Price label
        svg
          .append("text")
          .attr("x", chartWidth - 5)
          .attr("y", y(livePrice) - 5)
          .attr("text-anchor", "end")
          .attr("fill", "#ffffff")
          .attr("font-size", isMobile ? "10px" : "12px")
          .text(
            `$${livePrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`
          );
      }
    } catch (err) {
      console.error("Error drawing chart:", err);
    }
  }, [
    chartDimensions,
    klineData,
    liveData,
    selectedAsset,
    timeRange,
    loading,
    error,
    isResizing,
    getLivePrice,
    processKlineData,
    updateChartDimensions,
  ]);

  // Redraw chart on data changes, visibility changes, or dimension updates
  useEffect(() => {
    // Force redraw whenever data changes or dimensions change
    if (!loading && !error && selectedAsset) {
      drawChart();
    }
  }, [drawChart, loading, error, selectedAsset, klineData, chartDimensions]);

  // Handle time range selection
  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
  };

  const timeRangeLabels: Record<TimeRange, string> = {
    "24h": "1D",
    "1w": "1W",
    "1m": "1M",
    "6m": "6M",
    "1y": "1Y",
    all: "All",
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
        {isConnected && <span className={styles.liveBadge}>Live</span>}
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <FadeInMotion
            key="loader"
            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.3 }}
          >
            <div className={styles.loaderContainer}>
              <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
                <span>Loading chart</span>
              </div>
            </div>
          </FadeInMotion>
        ) : error ? (
          <FadeInMotion
            key="error"
            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.3 }}
          >
            <div className={styles.errorContainer}>
              {retryCount < 3 ? (
                <div className={styles.retrying}>
                  <div className={styles.spinnerContainer}>
                    <div className={styles.spinner}></div>
                    <span>Retrying</span>
                  </div>
                </div>
              ) : (
                <div>
                  <p>Unable to load chart data</p>
                  <button
                    className={styles.retryButton}
                    onClick={() => setRetryCount(0)}
                  >
                    Try again
                  </button>
                </div>
              )}
            </div>
          </FadeInMotion>
        ) : (
          <FadeInMotion
            key="chart"
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
          >
            <div
              ref={chartRef}
              className={styles.chart}
              style={{ height: chartDimensions.height }}
            />
          </FadeInMotion>
        )}
      </AnimatePresence>

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
              {timeRangeLabels[range]}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default AssetChart;
