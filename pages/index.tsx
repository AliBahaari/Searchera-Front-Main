import {
  AppBar,
  Box,
  ClickAwayListener,
  Grid,
  Popper,
  TextField,
  Toolbar,
  Typography,
  filledInputClasses,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SearchedProductWithThumbnail from "@/components/SearchedProductWithThumbnail";
import SearchedProduct from "@/components/SearchedProduct";
import Logo from "@/public/images/Logo.svg";
import SearcheraLogo from "@/public/images/Searchera-Logo.svg";
import Image from "next/image";
import MainAppBar from "@/components/MainAppBar";

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
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [searchTextDelay, setSearchTextDelay] = useState<string>("");
  const suggestionListRef = useRef(null);
  const query = router.query.query;
  const [fetchedData, setFetchedData] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setSearchTextDelay(searchText);
    }, 500);
  }, [searchText]);

  useEffect(() => {
    if (searchTextDelay.length > 0) {
      setFetchedData([]);

      axios
        .post("http://127.0.0.1:5000/api/amirhoseyn", {
          input_searchbox: String(searchTextDelay),
        })
        .then((result) => {
          if (result.data.length > 0) {
            let allData: any[] = [];

            result.data.forEach((i: any, index: number) => {
              if (index < 5) allData.push(i);
            });
            console.info(allData);
            setFetchedData(allData);
          }
        });

      setAnchorEl(suggestionListRef.current);
    } else setAnchorEl(null);
  }, [searchTextDelay, query]);

  return (
    <>
      <MainAppBar />

      <Box
        sx={{
          height: "calc(100vh - 200px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ margin: "0 auto", display: "block" }}
          src={Logo}
          width={200}
          height={undefined}
          alt={"Logo"}
        />

        <Grid
          mt={5}
          width={{ xs: "70%", sm: "60%", lg: "40%" }}
          mx={"auto"}
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
                    <SearchIcon sx={{ mr: 1, color: "common.textGrey" }} />
                  ),
                }}
                onChange={(event) => setSearchText(event.target.value)}
                onKeyDown={(event) => {
                  console.info(event.code);
                  if (event.code === "Enter" || event.code === "NumpadEnter")
                    router.push({
                      pathname: "/search/",
                      query: {
                        // @ts-ignore
                        query: event.target.value,
                      },
                    });
                }}
              />

              <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
                <Box
                  sx={{
                    border: 1,
                    borderTop: 0,
                    borderColor: "common.textGrey",
                    backgroundColor: "common.white",
                    p: 2,
                    // @ts-ignore
                    width: suggestionListRef.current?.offsetWidth - 100,
                  }}
                >
                  {fetchedData?.length === 0 && (
                    <Typography>موردی یافت نشد.</Typography>
                  )}
                  {fetchedData.map((props, index) => (
                    <SearchedProductWithThumbnail key={index} {...props} />
                  ))}
                  {fetchedData.map((props, index) => (
                    <SearchedProduct
                      key={index}
                      {...props}
                      searchText={searchText}
                    />
                  ))}
                </Box>
              </Popper>
            </Grid>
          </ClickAwayListener>
        </Grid>
      </Box>
    </>
  );
}
