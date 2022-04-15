import React, { useState, useEffect } from "react";

function useUsername() {
  const [userNames, setUserNames] = useState([]);
  const [state, setState] = useState();
  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUserNames([...data]));
  }, [state]);

  return [userNames, setState];
}

export default useUsername;
