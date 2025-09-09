import React, { useState } from "react";
import { getShortURLStats } from "../utils/api";

const StatisticsPage = () => {
  const [shortcode, setShortcode] = useState("");
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState("");

  const handleFetchStats = async () => {
    const result = await getShortURLStats(shortcode);

    if (result.error) {
      setError(result.error);
      setStats(null);
    } else {
      setStats(result);
      setError("");
    }
  };

  return (
    <div>
      <h2>Statistics</h2>
      <input
        type="text"
        placeholder="Enter shortcode"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
      />
      <button onClick={handleFetchStats}>Get Stats</button>

      {error && <p className="error">{error}</p>}

      {stats && (
        <div>
          <p>
            <b>Real URL:</b> {stats.realUrl}
          </p>
          <p>
            <b>Short URL:</b> {stats.shortURL}
          </p>
          <p>
            <b>Created At:</b> {stats.createdAt}
          </p>
          <p>
            <b>Expiry:</b> {stats.expiry}
          </p>
          <p>
            <b>Short Count:</b> {stats.shortCount}
          </p>
        </div>
      )}
    </div>
  );
};

export default StatisticsPage;
