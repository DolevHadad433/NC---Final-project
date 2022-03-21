import React, { useRef } from "react";
// import "./Search.css";
import SearchIcon from "@mui/icons-material/Search";

function Search({ currentSearch, onSearch }) {
  const searchElement = useRef(null);

  return (
    <div className="search-container">
      <SearchIcon />
      <input
        ref={searchElement}
        type="text"
        placeholder="Search..."
        onChange={() => onSearch(searchElement.current.value)}
      ></input>
    </div>
  );
}

export default Search;
