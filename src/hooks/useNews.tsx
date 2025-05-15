import { useState, useEffect } from "react";

export const useNews = ({
  country,
  publishedAfter,
}: {
  country: string;
  publishedAfter: string;
}) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = import.meta.env.VITE_MARKETAUX_API_KEY as string;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.marketaux.com/v1/news/all?countries=${country}&filter_entities=true&limit=10&published_after=${publishedAfter}&api_token=${API_KEY}`
      );
      const data = await response.json();
      setNews(data);
      setLoading(false);
    };
    if (country && publishedAfter) {
      fetchNews();
    } else {
    }
  }, [country, publishedAfter]);

  return { news, loading, error };
};

export default useNews;
