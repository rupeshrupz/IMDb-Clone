import React from "react";
import NavBar from "../Navigation/NavBar";
import WrapperComponent from "../HOC/WrapperComponent";
import TrailerCarousal from "./TrailerCarousal";
import FeaturedToday from "./FeaturedToday";
import { Box } from "@mui/material";
import WhatToWatch from "./WhatToWatch";

const Home = () => {
  return (
    <Box sx={{ minHeight: "340px" }}>
      <TrailerCarousal />
      <FeaturedToday />
      <WhatToWatch />
    </Box>
  );
};

export default WrapperComponent(Home);
