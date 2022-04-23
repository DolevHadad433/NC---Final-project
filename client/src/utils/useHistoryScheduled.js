import React, { useState, useEffect } from "react";

function useHistoryScheduled() {
  const [historyScheduledList, setHistoryScheduledList] = useState([]);
  const [state, setState] = useState();
  useEffect(() => {
    fetch("/api/history-scheduled/")
      .then((response) => response.json())
      .then((data) => setHistoryScheduledList([...data.reverse()]));
  }, [state]);

  return [historyScheduledList, setState];
}

export default useHistoryScheduled;