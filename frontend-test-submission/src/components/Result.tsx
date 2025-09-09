import React from "react";

type Result = {
  shortLink: string;
  expiry: string;
};

const ShortenResultList = ({ results }: { results: Result[] }) => (
  <div>
    <h3>Shortened URLs</h3>
    <ul>
      {results.map((r, index) => (
        <li key={index}>
          <a href={r.shortLink} target="_blank" rel="noopener noreferrer">
            {r.shortLink}
          </a>{" "}
          (Expires at: {r.expiry})
        </li>
      ))}
    </ul>
  </div>
);

export default ShortenResultList;
