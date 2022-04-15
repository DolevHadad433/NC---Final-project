import React, { useState, useEffect } from "react";

function useUsername() {
  const [userNames, setUserNames] = useState([]);
  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUserNames([...data]));
  }, []);

  return userNames;
}

export default useUsername;
