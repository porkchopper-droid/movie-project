import React, { useState, useContext } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import "./SearchBar.scss";

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
        className="input-style"
        type="text"
        placeholder="Search for movies..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
      />
      <button type="submit" className="search-button-style">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
