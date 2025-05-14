import { useEffect, useState, useRef, useCallback, useMemo } from "react";

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export type LiveData = {
  e: string;
  E: number;
  s: string;
  p: string;
  P: string;
  w: string;
  x: string;
  c: string;
  Q: string;
  b: string;
  B: string;
  a: string;
  A: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
  O: number;
  C: number;
  F: number;
  L: number;
  n: number;
};

type UseLiveDataResponse = {
  liveData: LiveData[];
  isConnected: boolean;
  error?: Error;
};

export const useLiveData = (): UseLiveDataResponse => {
  const [liveData, setLiveData] = useState<LiveData[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | undefined>();
  const [retryCount, setRetryCount] = useState(0);

  const debounceTimerRef = useRef<number | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<number | null>(null);

  const MAX_RETRIES = 5;
  const RETRY_DELAY = 2000; // 2 seconds

  // Memoize the connect function
  const connect = useCallback(() => {
    // Only connect if not already connected
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    const wsUrl = "wss://stream.binance.com:9443/ws/!ticker@arr";
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connection established.");
      setIsConnected(true);
      setError(undefined);
    };

    socket.onmessage = (event) => {
      try {
        const rawData: LiveData[] = JSON.parse(event.data);

        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = window.setTimeout(() => {
          setLiveData(rawData);
        }, 500);
      } catch (err) {
        console.error("Error processing WebSocket message:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to process data")
        );
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
      setIsConnected(false);
      setError(new Error("WebSocket connection error"));

      // Attempt to reconnect
      if (retryCount < MAX_RETRIES) {
        reconnectTimerRef.current = window.setTimeout(() => {
          setRetryCount((prev) => prev + 1);
          connect();
        }, RETRY_DELAY * Math.pow(2, retryCount)); // Exponential backoff
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
      setIsConnected(false);

      // Attempt to reconnect if not at max retries
      if (retryCount < MAX_RETRIES) {
        reconnectTimerRef.current = window.setTimeout(() => {
          setRetryCount((prev) => prev + 1);
          connect();
        }, RETRY_DELAY * Math.pow(2, retryCount)); // Exponential backoff
      }
    };

    // Add reconnection logic with exponential backoff
  }, [retryCount]);

  useEffect(() => {
    connect();

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
      }
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [connect]);

  // Memoize the return value
  return useMemo(
    () => ({
      liveData,
      isConnected,
      error,
    }),
    [liveData, isConnected, error]
  );
};
