import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import WrapperComponent from "../HOC/WrapperComponent";
import moment from "moment";
import axios from "axios";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate } from "react-router-dom";

const MonthlyReleases = () => {
  const [display, setDisplay] = useState([]);
  const [newDisplay, setNewDisplay] = useState();
  const navigate = useNavigate();

  let promises = [];

  let handleClick = (e, ele) => {
    navigate(`/movie/${ele.data.id}`);
  };

  const month = moment().add(1, "months");

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
        let filtered = data.results.filter((ele, ind) => ele.overview !== "");
        setDisplay(filtered);
      });
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (display !== undefined) {
      for (let i = 0; i < display.length; i++) {
        promises.push(
          axios.get(
            `https://api.themoviedb.org/3/movie/${display[i].id}?api_key=${process.env.REACT_APP_API_KEY}`
          )
        );
      }
      Promise.all(promises).then((responses) => setNewDisplay(responses));
    }

  }, [display]);

  return (
    <Box
      sx={{
        backgroundColor: "#e6e6e6",
        minHeight: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          margin: { md: "0 150px", sm: "0 0" },
          width: "100%",
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            border: "1px solid #dbd6d6",
            borderRadius: "10px",
            margin: { md: "20px", sm: "16px", xs: "5px" },
            width: "100%",
            minHeight: "400px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: { md: "23px", sm: "18px", xs: "14px" },
              margin: { md: "5px 20px", sm: "5px 20px", xs: "5px 10px" },
            }}
          >
            {moment().format("MMMM")} {moment().format("YYYY")} picks: The
            movies you can't miss
          </Typography>
          {newDisplay &&
            newDisplay.map((ele, ind) => {
              return (
                <Card
                  id="monthlyReleaseCard"
                  onClick={(e) => handleClick(e, ele)}
                  sx={{
                    minWidth: { md: 345, sm: 345, xs: 200 },
                    margin: {
                      md: "0 20px 10px 20px",
                      sm: "0 15px 10px 15px",
                      xs: "0 8px 5px 8px",
                    },
                  }}
                  key={ind}
                >
                  <CardActionArea
                    sx={{
                      display: { md: "flex", sm: "flex", xs: "block" },
                      alignItems: "start",
                      justifyContent: "start",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="210px"
                      image={`https://image.tmdb.org/t/p/original${ele.data.poster_path}`}
                      alt={ele.data.title}
                      sx={{
                        objectFit: "fill",
                        width: "136px",
                        ":hover": { cursor: "pointer" },
                      }}
                      onClick={(e) => handleClick(e, ele)}
                    />
                    <CardContent
                      sx={{
                        minheight: "200px",
                        padding: {
                          xs: "0px",
                          md: "0 10px 0 10px",
                          sm: "0 10px 0 10px",
                        },
                      }}
                    >
                      <Stack direction="column" gap={"3px"}>
                        <Stack direction="row" gap={1} alignItems={"center"}>
                          <Typography
                            gutterBottom
                            variant="p"
                            component="div"
                            sx={{ margin: 0, padding: 0, fontSize: "13px" }}
                          >
                            {ind + 1}.
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            onClick={(e) => handleClick(e, ele)}
                            sx={{
                              margin: 0,
                              padding: 0,
                              fontSize: "15px",
                              color: "#136CB2",
                              fontWeight: "bold",
                              letterSpacing: "1px",
                              ":hover": {
                                cursor: "pointer",
                                textDecoration: "underline",
                              },
                            }}
                          >
                            {ele.data.title || ele.data.original_name}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="p"
                            component="div"
                            sx={{
                              margin: 0,
                              padding: 0,
                              fontSize: "13px",
                              color: "gray",
                            }}
                          >
                            ({moment().format("YYYY")})
                          </Typography>
                        </Stack>
                        <Stack direction="row" gap={1} alignItems={"center"}>
                          <Typography
                            gutterBottom
                            variant="p"
                            component="div"
                            sx={{ margin: 0, fontSize: "10px", color: "gray" }}
                          >
                            {ele.data.runtime} min
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="p"
                            component="div"
                            sx={{ margin: 0, padding: 0 }}
                          >
                            |
                          </Typography>
                          {ele.data.genres &&
                            ele.data.genres.map((ele, ind) => {
                              return (
                                <Typography
                                  key={ind}
                                  gutterBottom
                                  variant="p"
                                  component="p"
                                  sx={{
                                    margin: 0,
                                    padding: 0,
                                    fontSize: "10px",
                                    color: "gray",
                                  }}
                                >
                                  {ele.name},
                                </Typography>
                              );
                            })}
                        </Stack>
                        <Stack direction="row" gap={1} alignItems={"center"}>
                          <StarBorderIcon
                            sx={{ fontSize: "15px", color: "gray" }}
                          />
                          <Typography
                            gutterBottom
                            variant="p"
                            component="div"
                            sx={{
                              margin: 0,
                              padding: 0,
                              fontSize: "11px",
                              color: "black",
                            }}
                          >
                            Rate
                          </Typography>
                        </Stack>
                        <Typography
                          variant="body2"
                          color="black"
                          sx={{ margin: 0, padding: 0 }}
                        >
                          {ele.data.overview}
                        </Typography>
                        <Stack direction="column" gap={1} alignItems={"start"}>
                          <Typography
                            gutterBottom
                            variant="p"
                            component="div"
                            sx={{ margin: 0, fontSize: "10px", color: "gray" }}
                          >
                            Votes : {ele.data.vote_count}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="p"
                            component="div"
                            sx={{ margin: 0, fontSize: "11px", color: "gray" }}
                          >
                            Popularity : {ele.data.popularity}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="p"
                            component="div"
                            sx={{
                              margin: 0,
                              fontSize: { md: "16px", sm: "16px", xs: "14px" },
                              color: "black",
                              fontStyle: "italic",
                            }}
                          >
                            In Theatres{" "}
                            {moment(`${ele.data.release_date}`).format(
                              "MMM do dddd"
                            )}
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default WrapperComponent(MonthlyReleases);
