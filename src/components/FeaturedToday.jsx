import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListIcon from "@mui/icons-material/List";
import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

const FeaturedToday = () => {
  const [display, setDisplay] = useState([]);
  const [posters, setPosters] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isHovering2, setIsHovering2] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { md: "350px", sm: "250px", xs: "200px" },
    bgcolor: "black",
    border: "2px solid #000",
    boxShadow: 24,
    p: { md: 4, sm: 2, xs: 0 },
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    // autoplay: true,
    // autoplaySpeed: 3000,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
    // vertical: true,
    className: "postersCard",
    adaptiveHeight: true,
    // centerPadding: "50px",
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 5,
    //       slidesToScroll: 5,
    //     },
    //   },
    //   {
    //     breakpoint: 900,
    //     settings: {
    //       slidesToShow: 4,
    //       slidesToScroll: 2,
    //       speed: 1000,
    //     },
    //   },
    //   {
    //     breakpoint: 700,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 2,
    //       speed: 1000,
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 2,
    //       speed: 500,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //       speed: 500,
    //     },
    //   },
    // ],
  };
  const month = moment().add(1, "months");
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleMouseEnter2 = () => {
    setIsHovering2(true);
  };

  const handleMouseLeave2 = () => {
    setIsHovering2(false);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.REACT_APP_API_KEY
        }&primary_release_date.gte=${moment().format("YYYY")}-${moment().format(
          "MM"
        )}-01&primary_release_date.lte=${moment()
          .add(1, "months")
          .format("YYYY-MM-DD")}`
      )
      .then(({ data }) => {

        setDisplay(data.results);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then(({ data }) => {

        setPosters(data.results);
      });
  }, []);

  return (
    <Box
      sx={{
        minHeight: "290px",
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
        Featured today
      </Typography>

      <Stack
        spacing={{ xs: 1, sm: 3, md: 4 }}
        direction={{ md: "row", sm: "row", xs: "column" }}
        sx={{ padding: 0, margin: 0 }}
      >
        <Box sx={{ padding: 0, margin: 0 }}>
          <ImageList
            sx={{
              width: { md: 400, xs: "100%", sm: 250 },
              height: { md: 198, xs: 165, sm: 167 },
              background: "white",
              cursor: isHovering && "pointer",
            }}
            cols={3}
            rowHeight={164}
          >
            {display &&
              display.slice(0, 3).map((ele, ind) => {
                return (
                  <ImageListItem
                    key={ind}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() =>
                      navigate(`${moment().format("MMMM")}-releases`)
                    }
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original${ele.poster_path}`}
                      alt={ele.title}
                      loading="lazy"
                    />

                    <ImageListItemBar
                      sx={{
                        background: "transparent",
                        position: "absolute",
                        bottom: { md: "-32px", xs: "10px", sm: "-2px" },
                      }}
                      id={`featuredTodayMonthly${ind}`}
                      position="bottom"
                      actionIcon={
                        <IconButton
                          sx={{
                            color: isHovering ? "rgb(245,197,24)" : "white",
                          }}
                        >
                          <ListIcon />
                        </IconButton>
                      }
                      actionPosition="left"
                    />
                  </ImageListItem>
                );
              })}
          </ImageList>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: "white",
              fontSize: { xs: "13px", md: "15px", sm: "15px" },
              position: "relative",
              bottom: "16px",
              cursor: isHovering && "pointer",
              textDecoration: isHovering && "underline",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => navigate(`${moment().format("MMMM")}-releases`)}
          >
            {moment().format("MMMM")} releases you cant miss
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: "#5799ef",
              fontSize: { xs: "12px", md: "15px", sm: "15px" },
              position: "relative",
              width: "75px",
              bottom: "19px",
              textDecoration: isHovering && "underline",
              cursor: isHovering && "pointer",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => navigate(`${moment().format("MMMM")}-releases`)}
          >
            See the list
          </Typography>
        </Box>

        <Box onClick={handleOpen}>
          <ImageList
            sx={{
              width: { md: 400, xs: "100%", sm: 250 },
              height: { md: 198, xs: 165, sm: 167 },
              background: "white",
              cursor: isHovering2 && "pointer",
            }}
            cols={3}
            rowHeight={164}
          >
            {posters &&
              posters.slice(0, 3).map((ele, ind) => {
                return (
                  <ImageListItem
                    key={ind}
                    onMouseEnter={handleMouseEnter2}
                    onMouseLeave={handleMouseLeave2}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original${ele.profile_path}`}
                      alt={ele.title}
                      loading="lazy"
                    />

                    <ImageListItemBar
                      sx={{
                        background: "transparent",
                        position: "absolute",
                        bottom: { md: "-32px", xs: "10px", sm: "-2px" },
                      }}
                      id={`featuredTodayMonthly${ind}`}
                      position="bottom"
                      actionIcon={
                        <IconButton
                          sx={{
                            color: isHovering2 ? "rgb(245,197,24)" : "white",
                          }}
                        >
                          <ListIcon />
                        </IconButton>
                      }
                      actionPosition="left"
                    />
                  </ImageListItem>
                );
              })}
          </ImageList>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: "white",
              fontSize: { xs: "13px", md: "15px", sm: "15px" },
              position: "relative",
              bottom: "16px",
              cursor: isHovering2 && "pointer",
              textDecoration: isHovering2 && "underline",
            }}
            onMouseEnter={handleMouseEnter2}
            onMouseLeave={handleMouseLeave2}
          >
            Trending Celebrity Profiles
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: "#5799ef",
              fontSize: { xs: "12px", md: "15px", sm: "15px" },
              position: "relative",
              width: "125px",
              bottom: "19px",
              textDecoration: isHovering2 && "underline",
              cursor: isHovering2 && "pointer",
            }}
            onMouseEnter={handleMouseEnter2}
            onMouseLeave={handleMouseLeave2}
          >
            See More Profiles
          </Typography>
        </Box>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Slider {...settings}>
            {posters &&
              posters.map((ele, ind) => {
                return (
                  <ImageListItem
                    key={ind}
                    // sx={{height:{md:"100% !important"}}}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original${ele.profile_path}`}
                      alt={ele.title}
                      // sx={{objectFit:"contain"}}
                      loading="lazy"
                    />

                    <ImageListItemBar
                      title={ele.name}
                      position="bottom"
                      // subtitle={ele.title}
                      sx={{
                        color: "white",
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                          "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                      }}
                    />
                  </ImageListItem>
                );
              })}
          </Slider>
        </Box>
      </Modal>
    </Box>
  );
};

export default FeaturedToday;
