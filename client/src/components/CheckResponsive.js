import React, { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Container, Grid, ListItem } from "@mui/material";
import { border } from "@mui/system";

function CheckResponsive() {
  //   const theme = useTheme();
  //   const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [width, setWindowWidth] = useState(0);
  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };
  const responsive = {
    showTopNavMenu: width > 1023,
  };

  const showNav = {
    display: responsive.showTopNavMenu ? "flex" : "none",
  };
  const showMenuIcon = {
    display: responsive.showTopNavMenu ? "none" : "flex",
  };

  return (
    <Container maxWidth="lg">
      <header style={{ width: responsive.showTopNavMenu }} />
      <Grid container spacing={2} rowSpacing={2}>
        <Grid item xs={3} sm={4} md={6}  style={showMenuIcon}>
          <ListItem
            sx={{
              bgcolor: "green",
            }}
          >
            Menu Icon
          </ListItem>
        </Grid>
        <Grid item xs={12} style={showNav}>
          <ListItem
            sx={{
              bgcolor: "orange",
            }}
          >
            Nav Bar
          </ListItem>
        </Grid>

        <Grid item xs={12}>
          <main>
            <ListItem
              sx={{
                bgcolor: "navy",
                color: "white",
                fontWeight: "bold",
              }}
            >
              body
            </ListItem>
          </main>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CheckResponsive;

{
  /* <Grid item xs sm md lg>
          <ListItem
            sx={{
              bgcolor: "red",
            }}
          >
            red
          </ListItem>
        </Grid>
        <Grid item minWidth="sm" md lg>
          <ListItem
            sx={{
              bgcolor: "blue",
            }}
          >
            blue
          </ListItem>
        </Grid> */
}
{
  /* <Grid item xs={2} sm={4} md={6} lg={8}>
              <ListItem
                sx={{
                  bgcolor: "yellow",
                }}
              >
                yellow
              </ListItem>
            </Grid> */
}
{
  /* <Grid item xs={2} sm={4} md={6} lg={8}>
              <ListItem
                sx={{
                  bgcolor: "pink",
                }}
              >
                pink
              </ListItem>
            </Grid> */
}
