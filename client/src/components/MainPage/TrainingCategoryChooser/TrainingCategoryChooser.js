import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./TrainingCategoryChooser.css";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { width } from "@mui/system";

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
    <>
      {/* <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          ></Typography>
          <Typography variant="h5" component="div"></Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <br />
          </Typography>
          <Typography variant="body2"></Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Trainer: NAME
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Subscribe</Button>
        </CardActions>
      </Card> */}

      {/*========================*/}

      <div className="TrainingCategoryChooser">
        <Container maxWidth={400}>
          <Grid container spacing={2} direction="row" alignItems="center">
            {categoriesList.map((category) => {
              return (
                <Grid item>
                  <Button
                    variant="contained"
                    size="small"
                    key={category.id}
                    value={
                      category.title === undefined ? "All" : category.title
                    }
                    onClick={categoryButtonHandler}
                  >
                    {category.title === undefined ? "All" : category.title}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </Container>

        <div className="category-description-container">
          {categoriesList
            .filter((category) => category.title === selectedCategory)
            .map((category) => {
              return (
                <Card sx={{ marginTop: 2 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 16 }}
                      color="text.primary"
                      gutterBottom
                      key={category.id}
                      align="left"
                    >
                      {category.description}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default TrainingCategoryChooser;
