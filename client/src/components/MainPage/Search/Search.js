import React, { useRef } from "react";
import "./Search.css";

function Search({ currentSearch, onSearch }) {
  const searchElement = useRef(null);

  return (
    <div className="search-container">
      <input
        ref={searchElement}
        className={`search ${currentSearch !== "" ? "dirty" : ""}`}
        type="text"
        placeholder="Search..."
        onChange={() => onSearch(searchElement.current.value)}
      ></input>
    </div>
  );
}

export default Search;
