import {
  AppBar,
  Box,
  Button,
  ClickAwayListener,
  Grid,
  Icon,
  Popper,
  TextField,
  Toolbar,
  Typography,
  filledInputClasses,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useRef, useState } from "react";

const STextField = styled(TextField)(({ theme }) => ({
  [`& .${filledInputClasses.root}`]: {
    borderRadius: theme.spacing(2),
  },
  [`& .${filledInputClasses.root}::before`]: {
    borderBottom: 0,
  },
  [`& .${filledInputClasses.root}::after`]: {
    borderBottom: 0,
  },
  [`& .${filledInputClasses.input}`]: {
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
  },
}));

export default function Home() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const suggestionListRef = useRef(null);

  useEffect(() => {
    if (searchText.length > 0) setAnchorEl(suggestionListRef.current);
    else setAnchorEl(null);
  }, [searchText]);

  return (
    <>
      <AppBar position="relative" elevation={1}>
        <Toolbar
          sx={{
            background: ({ palette }) => palette.primary.main,
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              color: ({ palette }) => palette.common.white,
            }}
            variant="h3"
          >
            جستجو سریع و راحت با Searchera
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid
        width={"50%"}
        mx={"auto"}
        pt={20}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={10}
      >
        <ClickAwayListener
          onClickAway={() => {
            setSearchText("");
          }}
        >
          <Grid width={"100%"}>
            <STextField
              autoComplete="off"
              ref={suggestionListRef}
              fullWidth
              variant="filled"
              placeholder="دنبال چی می گردی؟"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <SearchIcon
                    sx={{ mr: 1, color: ({ palette }) => palette.grey[400] }}
                  />
                ),
              }}
              onChange={(event) => setSearchText(event.target.value)}
            />

            <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
              <Box
                sx={{
                  border: 1,
                  borderTop: 0,
                  borderColor: ({ palette }) => palette.grey[400],
                  backgroundColor: ({ palette }) => palette.common.white,
                  p: 2,
                  // @ts-ignore
                  width: suggestionListRef.current?.offsetWidth - 100,
                }}
              >
                <Grid container spacing={2} mb={2}>
                  <Grid item xs={2}>
                    <Box
                      sx={{
                        width: "100%",
                        height: 100,
                        backgroundColor: "#000",
                      }}
                    ></Box>
                  </Grid>
                  <Grid item xs={10} display={"flex"} flexDirection={"column"}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: " center",
                        gap: 4,
                      }}
                    >
                      <Typography>
                        گوشی موبایل اپل مدل iPhone 13 CH دو سیم‌ کارت ظرفیت 128
                        گیگابایت و رم 4 گیگابایت - نات اکتیو
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <Typography variant="caption">4.5</Typography>
                        <StarIcon sx={{ fontSize: 20 }} />
                      </Box>
                    </Box>

                    <Typography sx={{ alignSelf: "flex-end" }}>
                      44,500,000 تومان
                    </Typography>
                  </Grid>

                  <Box
                    sx={{
                      width: "100%",
                      height: 1.5,
                      backgroundColor: "#000",
                      mt: 2,
                      ml: 2,
                    }}
                  ></Box>
                </Grid>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <SearchIcon
                    sx={{
                      fontSize: 20,
                      color: ({ palette }) => palette.grey[400],
                    }}
                  />
                  <Typography>گوشی آیفون</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>مدل پرو</Typography>
                </Box>
              </Box>
            </Popper>
          </Grid>
        </ClickAwayListener>
      </Grid>
    </>
  );
}
