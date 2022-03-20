import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrainingCategoryChooser.css";

function TrainingCategoryChooser() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  let categoryLinkHandler = useNavigate();

  useEffect(() => {
    fetch("/api/categories/")
      .then((response) => response.json())
      .then((data) => setCategoriesList(["All", ...data]));
  }, []);

  function categoryButtonHandler(event) {
    switch (event.target.value) {
      case "All":
        setSelectedCategory(event.target.value);
        categoryLinkHandler(`/main-page/`);
        break;
      default:
        setSelectedCategory(event.target.value);
        categoryLinkHandler(`/main-page/${event.target.value}`);
        break;
    }
  }

  return (
    <div className="TrainingCategoryChooser">
      <div className="category-container">
        {categoriesList.map((category) => {
          return (
            <button
              key={category.id}
              className="category-btn"
              value={category.title === undefined ? "All" : category.title}
              onClick={categoryButtonHandler}
            >
              {category.title === undefined ? "All" : category.title}
            </button>
          );
        })}
      </div>
      <div className="category-description-container">
        {categoriesList
          .filter((category) => category.title === selectedCategory)
          .map((category) => {
            return <p key={category.id}>{category.description}</p>;
          })}
      </div>
    </div>
  );
}

export default TrainingCategoryChooser;
