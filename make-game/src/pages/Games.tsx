import React from "react";
import { Link } from "react-router-dom";

const Games = () => {
  return (
    <div>
      <h1>All Games</h1>
      <Link to="/">Home</Link>
      {/* filter by past, today, and upcoming (only should be able to edit upcoming) */}
    </div>
  );
};

export default Games;
