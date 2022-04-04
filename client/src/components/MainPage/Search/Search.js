//============ Imports start ============
import React, { useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
//============ Imports end ============


//============ Component start ============
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
//============ Component end ============

export default Search;
