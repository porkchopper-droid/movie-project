import React, { useState, useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const { setSearchQuery } = useContext(SearchContext);
  const [localQuery, setLocalQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localQuery);
    navigate("/search-page"); // Navigate to search page upon submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        style={{
          border: "none",
          borderRadius: "0.5rem",
          padding: "0.2rem 0.3rem",
          width: "9rem",
        }}
        type="text"
        placeholder="Search for movies..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
      />
      <button
        type="submit"
        style={{
          margin: "0 10px",
          border: "none",
          borderRadius: "0.5rem",
          padding: "0.2rem 0.3rem",
          color: "#707570",
          fontWeight: "bold",
        }}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
