import React, { useRef } from "react";

function Search({ currentSearch, onSearch }) {
  const searchElement = useRef(null);

  return (
    <input
      ref={searchElement}
      className={`search ${currentSearch !== "" ? "dirty" : ""}`}
      type="text"
      placeholder="Search..."
      onChange={() => onSearch(searchElement.current.value)}
    ></input>
  );
}

export default Search;
