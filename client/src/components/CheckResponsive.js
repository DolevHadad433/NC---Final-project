import React, { useState, useEffect } from "react";
import useResponsive from "../utils/useResponsive";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Container, Grid, ListItem } from "@mui/material";
import { border } from "@mui/system";

function CheckResponsive() {

  const {
    showInMobileOnly,
    showInTabletOnly,
    showInTabletVerticalOnly,
    showInTabletHorizontalOnly,
    showInTabletVerticalAndBelow,
    showInTabletHorizontalAndBelow,
    showInLaptopOnly,
    showInLaptopAndBelow,
    showInLaptopToTabletVertical,
    showInLaptopToTabletHorizontalOnly,
    showInDesktopToTabletVerticalOnly,
    showInDesktopToTabletHorizontalOnly,
    showInDesktopToLaptopOnly,
    showInDesktopOnly,
    showInAllWidth,
  } = useResponsive();

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} rowSpacing={2}>
        <Grid item xs={12} style={showInMobileOnly}>
          <ListItem
            sx={{
              bgcolor: "#44ff00",
            }}
          >
            Mobile only
          </ListItem>
        </Grid>
        <Grid item xs={12} style={showInTabletOnly}>
          <ListItem
            sx={{
              bgcolor: "#001aff",
            }}
          >
            Tablet only
          </ListItem>
        </Grid>
        <Grid item xs={12} style={showInTabletVerticalOnly}>
          <ListItem
            sx={{
              bgcolor: "#2b7b9e",
            }}
          >
            Tablet vertical only
          </ListItem>
        </Grid>
        <Grid item xs={12} style={showInTabletHorizontalOnly}>
          <ListItem
            sx={{
              bgcolor: "#82b4fa",
            }}
          >
            Tablet horizontal only
          </ListItem>
        </Grid>
        <Grid item xs={12} style={showInTabletVerticalAndBelow}>
          <ListItem
            sx={{
              bgcolor: "#012547",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Tablet vertical and below
          </ListItem>
        </Grid>
        <Grid item xs={12} style={showInTabletHorizontalAndBelow}>
          <ListItem
            sx={{
              bgcolor: "#1f66ff",
            }}
          >
            Tablet horizontal and below
          </ListItem>
        </Grid>
        <Grid item xs={12} style={showInLaptopOnly}>
          <ListItem
            sx={{
              bgcolor: "#ff1100",
            }}
          >
            Leptop only
          </ListItem>
        </Grid>
        <Grid item xs={12} style={showInLaptopAndBelow}>
          <ListItem
            sx={{
              bgcolor: "#fff700",
            }}
          >
            Leptop and below
          </ListItem>
        </Grid>
        <Grid item xs={12} style={showInLaptopToTabletVertical}>
          <ListItem
            sx={{
              bgcolor: "#301203",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Leptop to tablet vertical
          </ListItem>
        </Grid>
        <Grid item xs={12} style={showInLaptopToTabletHorizontalOnly}>
          <ListItem
            sx={{
              bgcolor: "#5e2f1d",
            }}
          >
            Leptop to tablet horizontal only
          </ListItem>
        </Grid>
        <Grid item xs={12} style={showInDesktopToTabletVerticalOnly}>
          <ListItem
            sx={{
              bgcolor: "#2e2d2d",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Desktop to tablet vertical (Tablet vertical and higher)
          </ListItem>
        </Grid>
        <Grid item xs={12} style={showInDesktopToTabletHorizontalOnly}>
          <ListItem
            sx={{
              bgcolor: "#808080",
            }}
          >
            Desktop to tablet horizontal only (Tablet horizontal and higher)
          </ListItem>
        </Grid>
        <Grid item xs={12} style={showInDesktopToLaptopOnly}>
          <ListItem
            sx={{
              bgcolor: "#000000",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Desktop to leptop only (Leptop and higher)
          </ListItem>
        </Grid>
        <Grid item xs={12} style={showInDesktopOnly}>
          <ListItem
            sx={{
              bgcolor: "#ff9100",
            }}
          >
            Desktop only
          </ListItem>
        </Grid>

        <Grid item xs={12} style={showInAllWidth}>
          <ListItem
            sx={{
              bgcolor: "#7b00ff",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Desktop and below (All width)
          </ListItem>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CheckResponsive;


