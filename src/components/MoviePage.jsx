import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WrapperComponent from "../HOC/WrapperComponent";
import {
  Box,
  Card,
  CardMedia,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ReactPlayer from "react-player/youtube";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";

const MoviePage = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [videos, setVideos] = useState([]);
  const [director, setDirector] = useState([]);
  const [actors, setActors] = useState([]);
  const [writer, setWriter] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then(({ data }) => {
        setMovies(data);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then(({ data }) => {
        let trailer = data.results.filter(
          (ele) => ele.type == "Trailer" || ele.type == "Clip"
        );
        setVideos(trailer[0]);
      });

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then(({ data }) => {
        let dir = data.crew.filter(
          (ele) => ele.known_for_department == "Directing"
        );
        let stars = data.cast.filter(
          (ele) => ele.known_for_department == "Acting"
        );
        let write = data.crew.filter((ele) => ele.department == "Writing");

        setDirector(dir[0]);
        setActors(stars.slice(0, 3));
        setWriter(write.slice(0, 2));
      });
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          height: "100vh",
          backgroundImage: `url("https://image.tmdb.org/t/p/original${movies.backdrop_path}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(150px)",
          zIndex: "-1",
          position: "absolute",
          width: "100%",
        }}
      ></Box>
      <Box
        id="movieBody"
        sx={{
          minHeight: "100vh",
          margin: "0 auto",
          width: { md: "92%", sm: "94%", xs: "96%" },
        }}
      >
        <Stack
          id="movieHeader"
          sx={{ marginTop: "40px" }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Stack direction="column">
              <Typography
                variant="h3"
                sx={{
                  color: "WHite",
                  fontSize: { md: "35px", sm: "30px", xs: "22px" },
                }}
              >
                {movies.title}
              </Typography>
              <Stack direction="row" gap="10px" alignItems="center">
                <Typography
                  variant="p"
                  sx={{
                    color: "#afa8a8",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {movies.release_date}
                </Typography>

                <Typography
                  variant="p"
                  sx={{
                    color: "#afa8a8",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {Math.floor(movies.runtime / 60) +
                    "h " +
                    (movies.runtime % 60) +
                    " m"}
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Box
            sx={{
              display: { md: "flex", xs: "none" },
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <Stack direction="column" gap="5px" alignItems="center">
              <Typography
                variant="p"
                sx={{
                  color: "#d7d7d7",
                  fontSize: "14px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                }}
              >
                IMDb RATING
              </Typography>
              <Stack direction="row" alignItems="center" gap="5px">
                <StarIcon sx={{ color: "rgb(245,197,24)" }} />
                <Typography
                  variant="p"
                  sx={{ color: "#d7d7d7", fontSize: "17px", fontWeight: "600" }}
                >
                  {movies.vote_average}/10
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="column" gap="5px" alignItems="center">
              <Typography
                variant="p"
                sx={{
                  color: "#d7d7d7",
                  fontSize: "14px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                }}
              >
                YOUR RATING
              </Typography>
              <Stack direction="row" alignItems="center" gap="5px">
                <StarBorderIcon sx={{ color: "rgb(87, 153, 239)" }} />
                <Typography
                  variant="p"
                  sx={{
                    color: "rgb(87, 153, 239)",
                    fontSize: "17px",
                    fontWeight: "600",
                  }}
                >
                  Rate
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="column" gap="5px" alignItems="center">
              <Typography
                variant="p"
                sx={{
                  color: "#d7d7d7",
                  fontSize: "14px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                }}
              >
                POPULARITY
              </Typography>
              <Stack direction="row" alignItems="center">
                <ArrowDropUpIcon
                  sx={{ color: "#afa8a8", fontWeight: "bold" }}
                />
                <Typography
                  variant="p"
                  sx={{ color: "#afa8a8", fontSize: "17px", fontWeight: "600" }}
                >
                  {movies.popularity}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        <Box
          id="movieVideoSection"
          sx={{
            marginTop: "10px",
            display: "flex",
            flexDirection: { md: "row", sm: "column", xs: "column" },
            width: "100%",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            flexBasis="80%"
            justifyContent="space-evenly"
          >
            <Card
              sx={{
                maxWidth: "250px",
                border: "1px solid black",
                display: { md: "block", sm: "block", xs: "none" },
              }}
            >
              <CardMedia
                component="img"
                height="194"
                image={`https://image.tmdb.org/t/p/original${movies.poster_path}`}
                alt={movies.title}
                sx={{ height: "353px", objectFit: "fill" }}
              />
            </Card>
            <ReactPlayer
              className="react-player"
              height="353px"
              playing={true}
              muted={true}
              controls={true}
              loop={false}
              url={`https://www.youtube.com/watch?v=${
                videos !== undefined && videos.key
              }`}
            />
          </Stack>
          <Stack
            flexBasis="20%"
            sx={{
              width: "100%",
              flexDirection: { md: "column", sm: "row", xs: "row" },
              gap: { sm: "4px", md: "2px", xs: "2px" },
            }}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Paper
              sx={{
                width: "100%",
                height: { md: "172px", sm: "40px", xs: "30px" },
                background: "#1e1e1e",
                opacity: "0.5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                ":hover": { opacity: "0.7" },
              }}
              elevation={0}
            >
              <Stack
                gap="5px"
                alignItems="center"
                sx={{ flexDirection: { md: "column", sm: "row", xs: "row" } }}
              >
                <VideoLibraryIcon
                  sx={{
                    color: "white",
                    fontSize: { md: "30px", sm: "25px", xs: "20px" },
                  }}
                />
                <Typography
                  variant="p"
                  sx={{
                    color: "white",
                    fontSize: { md: "20px", sm: "16px", xs: "13px" },
                  }}
                >
                  Videos
                </Typography>
              </Stack>
            </Paper>
            <Paper
              sx={{
                width: "100%",
                height: { md: "172px", sm: "40px", xs: "30px" },
                background: "#1e1e1e",
                opacity: "0.5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                ":hover": { opacity: "0.7" },
              }}
              elevation={0}
            >
              <Stack
                gap="5px"
                alignItems="center"
                sx={{ flexDirection: { md: "column", sm: "row", xs: "row" } }}
              >
                <PhotoLibraryIcon
                  sx={{
                    color: "white",
                    fontSize: { md: "30px", sm: "25px", xs: "20px" },
                  }}
                />
                <Typography
                  variant="p"
                  sx={{
                    color: "white",
                    fontSize: { md: "20px", sm: "16px", xs: "13px" },
                  }}
                >
                  Photos
                </Typography>
              </Stack>
            </Paper>
          </Stack>
        </Box>

        <Box id="movieDetailsSection" sx={{ marginTop: "10px", width: "100%" }}>
          <Stack sx={{ flexDirection: { xs: "row" }, gap: { xs: "10px" } }}>
            <Card
              sx={{
                maxWidth: "100px",
                height: "100%",
                border: "1px solid black",
                display: { md: "none", sm: "none", xs: "block" },
                flexBasis: { xs: "30%" },
              }}
            >
              <CardMedia
                component="img"
                // height="100"
                image={`https://image.tmdb.org/t/p/original${movies.poster_path}`}
                alt={movies.title}
                sx={{ objectFit: "fill" }}
              />
            </Card>
            <Stack
              direction="column"
              sx={{ flexBasis: { xs: "70%" }, gap: { xs: "3px" } }}
            >
              <Stack
                direction="row"
                sx={{
                  gap: { xs: "4px", sm: "10px", md: "15px" },
                  flexWrap: "wrap",
                }}
              >
                {movies.genres !== undefined &&
                  movies.genres.map((ele, ind) => {
                    return (
                      <Chip
                        key={ind}
                        label={`${ele.name}`}
                        size="medium"
                        sx={{
                          fontSize: { xs: "12px", sm: "15px", md: "18px" },
                          color: "white",
                        }}
                        variant="outlined"
                      />
                    );
                  })}
              </Stack>
              <Typography
                variant="p"
                sx={{
                  fontSize: { xs: "12px", sm: "15px", md: "17px" },
                  color: "white",
                }}
              >
                {movies.overview}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              display: { xs: "flex", sm: "flex", md: "none" },
              padding: "10px 0",
              gap: { xs: "10px", sm: "25px" },
            }}
          >
            <Stack direction="row" alignItems="center" gap="5px">
              <StarIcon sx={{ color: "rgb(245,197,24)" }} />
              <Typography
                variant="p"
                sx={{
                  color: "#d7d7d7",
                  fontSize: { xs: "14px", sm: "18px" },
                  fontWeight: "600",
                }}
              >
                {movies.vote_average}/10
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap="5px">
              <StarBorderIcon sx={{ color: "rgb(87, 153, 239)" }} />
              <Typography
                variant="p"
                sx={{
                  color: "rgb(87, 153, 239)",
                  fontSize: { xs: "14px", sm: "18px" },
                  fontWeight: "600",
                }}
              >
                Rate
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <ArrowDropUpIcon sx={{ color: "#afa8a8", fontWeight: "bold" }} />
              <Typography
                variant="p"
                sx={{
                  color: "#afa8a8",
                  fontSize: { xs: "14px", sm: "18px" },
                  fontWeight: "600",
                }}
              >
                {movies.popularity}
              </Typography>
            </Stack>
          </Stack>
          <List
            sx={{ maxWidth: { md: "750px", sm: "500px", xs: "350px" } }}
            component="nav"
            aria-label="mailbox folders"
          >
            <Divider sx={{ borderColor: "#9d9191" }} />
            <Stack direction="row">
              <ListItem sx={{ paddingLeft: 0, flexBasis: "20%" }}>
                <ListItemText
                  primary="Director"
                  primaryTypographyProps={{
                    fontSize: { xs: "12px", sm: "17px" },
                  }}
                  sx={{ color: "white", fontWeight: "bold" }}
                />
              </ListItem>
              <ListItem sx={{ paddingLeft: 0, flexBasis: "80%" }}>
                <ListItemText
                  primary={`${director.name ? director.name : " "}`}
                  primaryTypographyProps={{
                    fontSize: { xs: "12px", sm: "17px" },
                  }}
                  sx={{ color: "rgb(87, 153, 239)", fontWeight: "bold" }}
                />
              </ListItem>
            </Stack>
            <Divider sx={{ borderColor: "#9d9191" }} />
            <Stack direction="row">
              <ListItem sx={{ paddingLeft: 0, flexBasis: "20%" }}>
                <ListItemText
                  primary="Writer"
                  primaryTypographyProps={{
                    fontSize: { xs: "12px", sm: "17px" },
                  }}
                  sx={{ color: "white", fontWeight: "bold" }}
                />
              </ListItem>
              <ListItem sx={{ padding: 0, margin: 0, flexBasis: "50%" }}>
                <ListItemText
                  primary={`${writer[0] !== undefined ? writer[0].name : " "}`}
                  primaryTypographyProps={{
                    fontSize: { xs: "12px", sm: "17px" },
                  }}
                  sx={{
                    color: "rgb(87, 153, 239)",
                    fontWeight: "bold",
                    padding: "0",
                  }}
                />
                {writer[1] !== undefined && (
                  <>
                    <ListItemText
                      primary={
                        <FiberManualRecordRoundedIcon
                          sx={{ color: "white", fontSize: "3px" }}
                        />
                      }
                      sx={{ color: "rgb(87, 153, 239)", fontWeight: "bold" }}
                    />
                    <ListItemText
                      primary={`${
                        writer[1] !== undefined ? writer[1].name : " "
                      }`}
                      primaryTypographyProps={{
                        fontSize: { xs: "12px", sm: "17px" },
                      }}
                      sx={{ color: "rgb(87, 153, 239)", fontWeight: "bold" }}
                    />
                  </>
                )}
              </ListItem>
            </Stack>
            <Divider sx={{ borderColor: "#9d9191" }} />
            <Stack direction="row">
              <ListItem sx={{ paddingLeft: 0, flexBasis: "20%" }}>
                <ListItemText
                  primary="Stars"
                  primaryTypographyProps={{
                    fontSize: { xs: "12px", sm: "17px" },
                  }}
                  sx={{ color: "white", fontWeight: "bold" }}
                />
              </ListItem>
              <ListItem sx={{ padding: 0, margin: 0, flexBasis: "70%" }}>
                <ListItemText
                  primary={`${actors[0] !== undefined ? actors[0].name : " "}`}
                  primaryTypographyProps={{
                    fontSize: { xs: "12px", sm: "17px" },
                  }}
                  sx={{
                    color: "rgb(87, 153, 239)",
                    fontWeight: "bold",
                    padding: "0",
                  }}
                />
                <ListItemText
                  primary={
                    <FiberManualRecordRoundedIcon
                      sx={{ color: "white", fontSize: "3px" }}
                    />
                  }
                  sx={{ color: "rgb(87, 153, 239)", fontWeight: "bold" }}
                />
                <ListItemText
                  primary={`${actors[1] !== undefined ? actors[1].name : ""}`}
                  primaryTypographyProps={{
                    fontSize: { xs: "12px", sm: "17px" },
                  }}
                  sx={{ color: "rgb(87, 153, 239)", fontWeight: "bold" }}
                />
                {actors[2] !== undefined && (
                  <>
                    <ListItemText
                      primary={
                        <FiberManualRecordRoundedIcon
                          sx={{ color: "white", fontSize: "3px" }}
                        />
                      }
                      sx={{ color: "rgb(87, 153, 239)", fontWeight: "bold" }}
                    />
                    <ListItemText
                      primary={`${
                        actors[2] !== undefined ? actors[2].name : " "
                      }`}
                      primaryTypographyProps={{
                        fontSize: { xs: "12px", sm: "17px" },
                      }}
                      sx={{ color: "rgb(87, 153, 239)", fontWeight: "bold" }}
                    />
                  </>
                )}
              </ListItem>
            </Stack>
            <Divider sx={{ borderColor: "#9d9191" }} />
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default WrapperComponent(MoviePage);
