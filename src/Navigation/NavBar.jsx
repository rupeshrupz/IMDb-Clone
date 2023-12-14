import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar
        position="static"
        sx={{
          minHeight: "58px",
          background: "rgb(20 18 18 / 87%)",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Toolbar sx={{ margin: { md: "0 5%", sm: "0 0", xs: "0 0" } }}>
          <Stack direction="row" alignItems="center" id="iconSection">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>

            <Box
              sx={{
                background: "rgb(245,197,24)",
                height: "32px",
                width: "64px",
                borderRadius: "4px",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                onClick={() => navigate("/")}
                sx={{
                  flexGrow: 1,
                  color: "black",
                  textAlign: "center",
                  fontWeight: 900,
                  letterSpacing: "-1px",
                  cursor: "pointer",
                }}
              >
                IMDb
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: "100%", marginLeft: "30px" }}
          >
            <ButtonGroup
              disableElevation
              id="searchField"
              variant="contained"
              aria-label="outlined button group"
              sx={{
                flexBasis: "60%",
                display: { md: "flex", sm: "flex", xs: "none" },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  background: "white",
                  height: "33px",
                  ":hover": { backgroundColor: "white" },
                }}
              >
                <Typography variant="p" sx={{ color: "black" }}>
                  All
                </Typography>
                <ArrowDropDownIcon fontSize="small" sx={{ color: "black" }} />
              </Button>

              <OutlinedInput
                id="outlined-adornment-weight"
                endAdornment={
                  <InputAdornment position="end">
                    <SearchOutlinedIcon fontSize="small" />
                  </InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                placeholder="serach IMDb"
                sx={{
                  background: "white",
                  height: "33px",
                  minWidth: { md: "310px", sm: "250px" },
                  "& fieldset": { border: "none" },
                }}
              />
              {/* <Button>Three</Button> */}
            </ButtonGroup>

            <Stack
              direction="row"
              gap="10px"
              alignItems="center"
              justifyContent="end"
              sx={{ flexBasis: { md: "30%", sm: "30%", xs: "100%" } }}
            >
              <SearchOutlinedIcon
                sx={{
                  fontSize: "30px",
                  display: {
                    md: "none",
                    sm: "none",
                    xs: "block",
                    cursor: "pointer",
                  },
                }}
              />
              <Typography
                variant="p"
                color="white"
                fontWeight="bold"
                fontSize="15px"
                sx={{ display: { md: "block", sm: "none", xs: "none" } }}
              >
                IMDb
                <Typography
                  variant="span"
                  color="rgb(47 143 247)"
                  fontWeight="bold"
                >
                  Pro
                </Typography>
              </Typography>

              <Stack
                direction="row"
                alignItems="center"
                sx={{ display: { md: "flex", sm: "none", xs: "none" } }}
              >
                <BookmarkAddIcon fontSize="small" />
                <Typography
                  variant="p"
                  color="white"
                  fontSize="13px"
                  sx={{ textAlign: "center" }}
                >
                  WatchList
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center">
                <AccountCircleIcon fontSize="medium" />
                <ArrowDropDownIcon
                  fontSize="small"
                  sx={{ display: { md: "block", sm: "block", xs: "none" } }}
                />
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                sx={{ display: { md: "flex", sm: "flex", xs: "none" } }}
              >
                <Typography
                  variant="p"
                  color="white"
                  fontSize="15px"
                  fontWeight="bold"
                >
                  EN
                </Typography>
                <ArrowDropDownIcon fontSize="14px" />
              </Stack>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
