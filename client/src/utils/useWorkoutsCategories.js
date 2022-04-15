import React, { useState, useEffect } from "react";

function useWorkoutsCategories() {
    const [categoriesList, setCategoriesList] = useState([]);
    const [state, setState] = useState();
  useEffect(() => {
    fetch("/api/categories/")
      .then((responseCategories) => responseCategories.json())
      .then((dataCategories) => setCategoriesList([...dataCategories]));
  }, [state]);

  return [categoriesList, setState];
}

export default useWorkoutsCategories;