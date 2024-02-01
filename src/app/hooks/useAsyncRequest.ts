import { useEffect, useState } from "react";

export function useAsyncRequest(url: string, enable: boolean) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (enable) {
          const response = await fetch(url);
          const jsonData = await response.json();
          setData(jsonData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, enable]);

  return { data, loading };
}
