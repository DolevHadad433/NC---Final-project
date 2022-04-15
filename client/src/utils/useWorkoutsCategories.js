import React, { useState, useEffect } from "react";

function useWorkoutsCategories() {
    const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    fetch("/api/categories/")
      .then((responseCategories) => responseCategories.json())
      .then((dataCategories) => setCategoriesList([...dataCategories]));
  }, []);

  return categoriesList;
}

export default useWorkoutsCategories;