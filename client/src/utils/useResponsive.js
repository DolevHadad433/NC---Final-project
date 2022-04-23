import React, { useState, useEffect, useCallback, useMemo } from "react";

function useResponsive() {
  const [width, setWindowWidth] = useState(0);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const responsive = {
    showInMobileOnly: width < 600,
    showInTabletOnly: width <= 1239 && width >= 600,
    showInTabletVerticalOnly: width <= 904 && width >= 600,
    showInTabletHorizontalOnly: width <= 1239 && width >= 905,
    showInTabletVerticalAndBelow: width <= 904,
    showInTabletHorizontalAndBelow: width <= 1239,
    showInLaptopOnly: width <= 1439 && width >= 1240,
    showInLaptopAndBelow: width <= 1439,
    showInLaptopToTabletVertical: width <= 1439 && width >= 600,
    showInLaptopToTabletHorizontalOnly: width <= 1439 && width >= 905,
    showInDesktopToTabletVerticalOnly: width >= 600,
    showInDesktopToTabletHorizontalOnly: width >= 905,
    showInDesktopToLaptopOnly: width >= 1240,
    showInDesktopOnly: width >= 1440,
    showInAllWidth: true,
  };

  const showInMobileOnly = {
    display: responsive.showInMobileOnly ? "flex" : "none",
  };

  const showInTabletOnly = {
    display: responsive.showInTabletOnly ? "flex" : "none",
  };
  const showInTabletVerticalOnly = {
    display: responsive.showInTabletVerticalOnly ? "flex" : "none",
  };
  const showInTabletHorizontalOnly = {
    display: responsive.showInTabletHorizontalOnly ? "flex" : "none",
  };
  const showInTabletVerticalAndBelow = {
    display: responsive.showInTabletVerticalAndBelow ? "flex" : "none",
  };
  const showInTabletHorizontalAndBelow = {
    display: responsive.showInTabletHorizontalAndBelow ? "flex" : "none",
  };
  const showInLaptopOnly = {
    display: responsive.showInLaptopOnly ? "flex" : "none",
  };
  const showInLaptopAndBelow = {
    display: responsive.showInLaptopAndBelow ? "flex" : "none",
  };
  const showInLaptopToTabletVertical = {
    display: responsive.showInLaptopToTabletVertical ? "flex" : "none",
  };
  const showInLaptopToTabletHorizontalOnly = {
    display: responsive.showInLaptopToTabletHorizontalOnly ? "flex" : "none",
  };
  const showInDesktopToTabletVerticalOnly = {
    display: responsive.showInDesktopToTabletVerticalOnly ? "flex" : "none",
  };
  const showInDesktopToTabletHorizontalOnly = {
    display: responsive.showInDesktopToTabletHorizontalOnly ? "flex" : "none",
  };
  const showInDesktopToLaptopOnly = {
    display: responsive.showInDesktopToLaptopOnly ? "flex" : "none",
  };
  const showInDesktopOnly = {
    display: responsive.showInDesktopOnly ? "flex" : "none",
  };
  const showInAllWidth = {
    display: responsive.showInAllWidth ? "flex" : "none",
  };

  const displayOrNot = useCallback((displayState) => {
    if (displayState.display === "flex") {
      return true;
    } else return false;
  }, []);

  const responsiveValues = useMemo(() => {
    return {
      displayOrNot,
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
    };
  });

  return { ...responsiveValues };
}

export default useResponsive;
