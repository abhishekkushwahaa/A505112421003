import React, { useState } from "react";
import { createShortURL } from "../utils/api";
import ShortenResultList from "./Result";

type Result = {
  shortLink: string;
  expiry: string;
};

const ShortenForm = () => {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!url) return setError("URL is required.");

    try {
      const resp = await createShortURL({
        url,
        validity: parseInt(validity) || 0,
        shortcode: shortcode || undefined,
      });
      setResults([...results, resp.data]);
      setError("");
    } catch (err: unknown) {
      if (err instanceof Error && err.message) {
        setError(err.message);
      } else {
        setError("Error creating short URL");
      }
    }
  };

  return (
    <div>
      <h2>Shorten URL</h2>
      <input
        type="text"
        placeholder="Original URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Validity in minutes"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Preferred Shortcode (optional)"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
      />
      <button onClick={handleSubmit}>Shorten</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ShortenResultList results={results} />
    </div>
  );
};

export default ShortenForm;
