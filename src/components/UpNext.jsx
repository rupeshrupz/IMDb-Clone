import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment/moment";

const UpNext = () => {
  const [display, setDisplay] = useState([]);
  const month = moment().add(6, "months");

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    vertical: true,
    className: "upNextCard",
    adaptiveHeight: true,
    centerPadding: "250px",
  };
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.REACT_APP_API_KEY
        }&include_video=true&release_date.gte=${month.format("YYYY-MM-DD")}`
      )
      .then(({ data }) => {

        setDisplay(data.results.slice(0, 5));
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      id="upNextMain"
    >
      <h4 style={{ color: "rgb(245,197,24)", margin: "0 0 10px 0" }}>
        Up Next
      </h4>
      <Slider {...settings}>
        {display &&
          display.map((ele, ind) => {
            return (
              <div key={ind} className="card">
                <img
                  src={`https://image.tmdb.org/t/p/original${ele.poster_path}`}
                  width={"80px"}
                />

                <p
                  style={{
                    color: "white",
                    marginLeft: "10px",
                    display: "inline-block",
                  }}
                >
                  {ele.title}
                </p>
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default UpNext;
