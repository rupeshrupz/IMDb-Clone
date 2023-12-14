import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import UpNext from "./UpNext";
import moment from "moment/moment";

const TrailerCarousal = () => {
  const [display, setDisplay] = useState([]);
  const month = moment().add(1, "months");

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then(({ data }) => {
        setDisplay(data.results.slice(0, 5));
      });
  }, []);

  return (
    <Box
      sx={{
        minHeight: "400px",
        display: "flex",
        overflow: "hidden",
        margin: { xs: "30px 0 0 0", md: "40px 70px 0 70px" },
      }}
    >
      <Carousel
        swipeable={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={2500}
        renderIndicator={false}
        showStatus={true}
        transitionTime={800}
      >
        {display &&
          display.map((ele, ind) => {
            return (
              <Box key={ind} sx={{ width: "100%" }}>
                <img
                  src={`https://image.tmdb.org/t/p/original${ele.backdrop_path}`}
                  style={{ height: "400px" }}
                />
                <p style={{ color: "white" }}>
                  {ele.title || ele.original_name}
                </p>
              </Box>
            );
          })}
      </Carousel>
      <UpNext />
    </Box>
  );
};

export default TrailerCarousal;
