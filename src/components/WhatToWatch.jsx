import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Slider from "react-slick";
import StarIcon from "@mui/icons-material/Star";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";

const WhatToWatch = () => {
  const [movies, setMovies] = useState([]);
  const [tvshows, setTvshows] = useState([]);
  const navigate = useNavigate();

  let handleClick = (e, ele) => {
    navigate(`/movie/${ele.id}`);
  };

  let handleClickTv = (e, ele) => {
    navigate(`/tv/${ele.id}`);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    // autoplay: true,
    // autoplaySpeed: 3000,
    arrows: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    centerMode: false,
    // vertical: true,
    className: "whatToWatchCard",
    adaptiveHeight: true,
    centerPadding: "50px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          // centerPadding:"10px"
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          speed: 1000,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          speed: 1000,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          speed: 500,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          speed: 500,
        },
      },
    ],
  };
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then(({ data }) => {
        let random = data.results.sort(() => Math.random() - 0.5);
        setMovies(random);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then(({ data }) => {
        let random = data.results.sort(() => Math.random() - 0.5);
        setTvshows(random);
      });
  }, []);

  return (
    <Box
      sx={{
        minHeight: "400px",
        margin: {
          xs: "30px 30px 0 30px",
          md: "40px 70px 0 70px",
          sm: "30px 50px 0 50px",
        },
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: "rgb(245,197,24)",
          fontSize: { xs: "20px", md: "30px", sm: "25px" },
        }}
      >
        What To Watch
      </Typography>
      <Stack
        direction={"row"}
        sx={{
          borderLeft: "3px solid rgb(245,197,24)",
          height: { xs: "18px", md: "30px", sm: "25px" },
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: "white",
            fontSize: { xs: "13px", md: "20px", sm: "17px" },
            fontWeight: "bold",
            paddingLeft: "10px",
          }}
        >
          Top Movies
        </Typography>
        <KeyboardArrowRightIcon
          sx={{
            color: "white",
            fontSize: { xs: "20px", md: "25px", sm: "25px" },
          }}
        />
      </Stack>
      <Slider {...settings}>
        {movies &&
          movies.map((ele, ind) => {
            return (
              <Card
                sx={{
                  maxWidth: 175,
                  background: "#1a1a1a",
                }}
                key={ind}
              >
                <CardMedia
                  component="img"
                  // height={{ xs: "150px  !important", md: "250px !important" }}
                  image={`https://image.tmdb.org/t/p/original${ele.poster_path}`}
                  alt={`${ele.title}`}
                  sx={{
                    objectFit: "fill",
                    height: {
                      xs: "220px  !important",
                      md: "250px  !important",
                      sm: "250px  !important",
                    },
                    cursor: "pointer",
                  }}
                  onClick={(e) => handleClick(e, ele)}
                />
                <CardContent>
                  <Stack justifyContent={"flexStart"} gap={"2px"}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      gap={"3px"}
                      sx={{ padding: "5px 0 5px 0" }}
                    >
                      <StarIcon
                        sx={{ color: "rgb(245,197,24)", fontSize: "15px" }}
                      />
                      <Typography
                        variant="p"
                        color="white"
                        sx={{ textAlign: "center", fontSize: "13px" }}
                      >
                        7.9
                      </Typography>
                    </Stack>

                    <Typography
                      variant="p"
                      noWrap
                      color="white"
                      sx={{
                        textAlign: "start",
                        fontSize: "15px",
                        cursor: "pointer",
                        ":hover": { textDecoration: "underline" },
                      }}
                      onClick={(e) => handleClick(e, ele)}
                    >
                      {ele.title || ele.name}
                    </Typography>
                  </Stack>

                  <Stack
                    sx={{ marginTop: { md: "32px", xs: "20px", sm: "25px" } }}
                  >
                    <Button variant="text" sx={{ background: "#2b2929" }}>
                      <Typography
                        variant="p"
                        color="#1976d2"
                        sx={{
                          textAlign: "center",
                          fontSize: { md: "12px", xs: "8px", sm: "10px" },
                        }}
                      >
                        Watch Options
                      </Typography>
                    </Button>
                    <Stack
                      alignItems={"center"}
                      direction={"row"}
                      justifyContent={"center"}
                    >
                      <Button
                        variant="text"
                        onClick={(e) => handleClick(e, ele)}
                      >
                        <PlayArrowIcon sx={{ color: "white" }} />
                        <Typography
                          variant="p"
                          color="white"
                          sx={{
                            textAlign: "center",
                            fontSize: { md: "12px", xs: "8px", sm: "10px" },
                          }}
                        >
                          Trailer
                        </Typography>
                      </Button>
                      {/* <InfoOutlinedIcon
                        sx={{
                          color: "white",
                          fontSize: { md: "23px", xs: "15px", sm: "20px" },
                        }}
                      /> */}
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
      </Slider>

      <Stack
        direction={"row"}
        sx={{
          borderLeft: "3px solid rgb(245,197,24)",
          height: { xs: "18px", md: "30px", sm: "25px" },
          margin: "30px 0 20px 0",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: "white",
            fontSize: { xs: "13px", md: "20px", sm: "17px" },
            fontWeight: "bold",
            paddingLeft: "10px",
          }}
        >
          Top Tv shows
        </Typography>
        <KeyboardArrowRightIcon
          sx={{
            color: "white",
            fontSize: { xs: "20px", md: "25px", sm: "25px" },
          }}
        />
      </Stack>
      <Slider {...settings}>
        {tvshows &&
          tvshows.map((ele, ind) => {
            return (
              <Card
                sx={{
                  maxWidth: 175,
                  background: "#1a1a1a",
                }}
                key={ind}
              >
                <CardMedia
                  component="img"
                  // height={{ xs: "150px  !important", md: "250px  !important" }}
                  image={`https://image.tmdb.org/t/p/original${ele.poster_path}`}
                  alt={`${ele.title}`}
                  sx={{
                    objectFit: "fill",
                    height: {
                      xs: "220px  !important",
                      md: "250px  !important",
                      sm: "250px  !important",
                    },
                    cursor: "pointer",
                  }}
                  onClick={(e) => handleClickTv(e, ele)}
                />
                <CardContent>
                  <Stack justifyContent={"flexStart"} gap={"2px"}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      gap={"3px"}
                      sx={{ padding: "5px 0 5px 0" }}
                    >
                      <StarIcon
                        sx={{ color: "rgb(245,197,24)", fontSize: "15px" }}
                      />
                      <Typography
                        variant="p"
                        color="white"
                        sx={{ textAlign: "center", fontSize: "13px" }}
                      >
                        7.9
                      </Typography>
                    </Stack>

                    <Typography
                      variant="p"
                      noWrap
                      color="white"
                      sx={{
                        textAlign: "start",
                        fontSize: "15px",
                        cursor: "pointer",
                        ":hover": { textDecoration: "underline" },
                      }}
                      onClick={(e) => handleClickTv(e, ele)}
                    >
                      {ele.title || ele.name}
                    </Typography>
                  </Stack>

                  <Stack
                    sx={{ marginTop: { md: "32px", xs: "20px", sm: "25px" } }}
                  >
                    <Button variant="text" sx={{ background: "#2b2929" }}>
                      <Typography
                        variant="p"
                        color="#1976d2"
                        sx={{
                          textAlign: "center",
                          fontSize: { md: "12px", xs: "8px", sm: "10px" },
                        }}
                      >
                        Watch Options
                      </Typography>
                    </Button>
                    <Stack
                      alignItems={"center"}
                      direction={"row"}
                      justifyContent={"center"}
                    >
                      <Button
                        variant="text"
                        onClick={(e) => handleClickTv(e, ele)}
                      >
                        <PlayArrowIcon sx={{ color: "white" }} />
                        <Typography
                          variant="p"
                          color="white"
                          sx={{
                            textAlign: "center",
                            fontSize: { md: "12px", xs: "8px", sm: "10px" },
                          }}
                        >
                          Trailer
                        </Typography>
                      </Button>
                      {/* <InfoOutlinedIcon
                        sx={{
                          color: "white",
                          fontSize: { md: "23px", xs: "15px", sm: "20px" },
                        }}
                      /> */}
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
      </Slider>
    </Box>
  );
};

export default WhatToWatch;
