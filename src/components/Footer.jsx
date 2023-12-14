import { Box, Stack } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import React from "react";
import "../App.css";

const Footer = () => {
  return (
    <Box
      style={{
        color: "white",
      }}
    >
      <Stack spacing={2} alignItems={"center"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: { xs: 3, md: 6 },
            margin: 0,
          }}
        >
          <InstagramIcon
            className="socialMediaIcon"
            sx={{ fontSize: { md: "25px", sm: "22px", xs: "18px" } }}
          />
          <FacebookIcon
            className="socialMediaIcon"
            sx={{ fontSize: { md: "25px", sm: "22px", xs: "18px" } }}
          />
          <YouTubeIcon
            className="socialMediaIcon"
            sx={{ fontSize: { md: "25px", sm: "22px", xs: "18px" } }}
          />
          <TwitterIcon
            className="socialMediaIcon"
            sx={{ fontSize: { md: "25px", sm: "22px", xs: "18px" } }}
          />
        </Box>

        <ul id="footer1">
          <li>Get the IMDb App</li>
          <li>Help</li>
          <li>Site Index</li>
          <li>IMDbPro</li>
          <li>Box Office Mojo</li>
          <li>IMDb Developer</li>
        </ul>

        <ul id="footer1">
          <li>Press Room</li>
          <li>Advertising</li>
          <li>Jobs</li>
          <li>Conditions of Use</li>
          <li>Privacy Policy</li>
          <li>Your Ads Privacy Choices</li>
        </ul>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            alignItems: "center",
            margin: 0,
            padding: 0,
          }}
        >
          {" "}
          <p>an</p>{" "}
          <img
            src="../../images/amazon.png"
            style={{ height: "20px", paddingTop: "10px" }}
          />{" "}
          <p>company</p>{" "}
        </Box>
        <p
          style={{
            fontSize: "small",
            fontWeight: 600,
            color: "rgba(158, 148, 148, 0.87)",
          }}
        >
          © 1990-2023 by IMDb.com, Inc.
        </p>
      </Stack>
    </Box>
  );
};

export default Footer;
