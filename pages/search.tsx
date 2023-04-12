import ProductThumbnail from "@/components/ProductThumbnail";
import {
  Box,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  styled,
  TextField,
  filledInputClasses,
  ClickAwayListener,
  Popper,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";

const STextField = styled(TextField)(({ theme }) => ({
  [`& .${filledInputClasses.root}`]: {
    borderRadius: theme.spacing(1),
  },
  [`& .${filledInputClasses.root}::before`]: {
    borderBottom: 0,
  },
  [`& .${filledInputClasses.root}::after`]: {
    borderBottom: 0,
  },
  [`& .${filledInputClasses.input}`]: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
  },
}));

export default function Search() {
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

      <Grid container height={100}>
        <Grid
          item
          xs={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box sx={{ width: 100, height: 30, backgroundColor: "#000" }}></Box>
        </Grid>

        <Grid
          item
          xs={6}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
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
                ></Box>
              </Popper>
            </Grid>
          </ClickAwayListener>
        </Grid>
      </Grid>

      <Grid
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        my={3}
        px={4}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <SortIcon />
          <Typography>مرتب سازی:</Typography>
          <Typography
            color={"grey.600"}
            sx={{ color: "primary.main", fontWeight: "bold" }}
          >
            پرفروش ترین
          </Typography>
          <Typography color={"grey.600"}>مرتبط ترین</Typography>
          <Typography color={"grey.600"}>ارزان ترین</Typography>
          <Typography color={"grey.600"}>گران ترین</Typography>
        </Box>
        <Typography>27 کالا</Typography>
      </Grid>

      <Grid container px={4} pb={4}>
        {[0, 1, 2, 3, 4].map((i, index) => (
          <Grid item xs={3} key={index}>
            <ProductThumbnail />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
