import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TrainingCategoryChooser() {
  const [categoriesList, setCategoriesList] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");

  let categoryLinkHandler = useNavigate();

  useEffect(() => {
    fetch("/api/categories/")
      .then((response) => response.json())
      .then((data) => setCategoriesList("All", ...data));
  }, []);

  function categoryButtonHandler(event) {
    switch (event.target.value) {
      case "All":
        setSelectedCategory(event.target.value);
        categoryLinkHandler(`/main-page`);
        break;
      default:
        setSelectedCategory(event.target.value);
        categoryLinkHandler(`/main-page:${event.target.value}`);
        break;
    }
  }

  return (
    <div className="TrainingCategoryChooser">
      <h2 className="categories-list-title">Here is the categories list:</h2>
      <div className="category-container">
        {categoriesList.map((category) => {
          return (
            <button
              key={category.id}
              className="category-btn"
              value={category.title}
              onClick={categoryButtonHandler}
            >
              {category.title}
            </button>
          );
        })}
        <div className="category-descreption-container">
          {categoriesList
            .filter((category) => category.title === selectedCategory)
            .map((category) => {
              return <p key={selectedCategory}>{category.descreption}</p>;
            })}
        </div>
      </div>
    </div>
  );
}

export default TrainingCategoryChooser;
