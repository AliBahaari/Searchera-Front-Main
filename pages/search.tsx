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
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Logo from "@/public/images/Logo.svg";
import Image from "next/image";
import SearchedProductWithThumbnail from "@/components/SearchedProductWithThumbnail";
import SearchedProduct from "@/components/SearchedProduct";
import Sort from "@/public/icons/Sort.svg";
import MainAppBar from "@/components/MainAppBar";

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
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [searchTextDelay, setSearchTextDelay] = useState<string>("");
  const suggestionListRef = useRef(null);
  const query = router.query.query;
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [suggestionListFetchedData, setSuggestionListFetchedData] = useState<
    any[]
  >([]);

  useEffect(() => {
    if (searchText.length > 0) setAnchorEl(suggestionListRef.current);
    else setAnchorEl(null);
  }, [searchText]);

  useEffect(() => {
    async function fetchQuery() {
      const fetchQueryRequest = await axios.post(
        "http://127.0.0.1:5000/api/amirhoseyn",
        {
          input_searchbox: String(query),
        }
      );

      setFetchedData(fetchQueryRequest.data);
    }

    fetchQuery();
  }, [query]);

  useEffect(() => {
    setTimeout(() => {
      setSearchTextDelay(searchText);
    }, 500);
  }, [searchText]);

  useEffect(() => {
    if (searchTextDelay.length > 0) {
      setSuggestionListFetchedData([]);

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

            setSuggestionListFetchedData(allData);
          }
        });

      setAnchorEl(suggestionListRef.current);
    } else setAnchorEl(null);
  }, [searchTextDelay, query]);

  return (
    <>
      <MainAppBar />

      <Grid container gap={2} p={4}>
        <Grid
          item
          xs={12}
          md={2}
          lg={1}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image
            style={{ margin: "0 auto" }}
            src={Logo}
            width={100}
            height={undefined}
            alt={"Logo"}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          lg={5}
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
                    <SearchIcon sx={{ mr: 1, color: "common.textGrey" }} />
                  ),
                }}
                onChange={(event) => setSearchText(event.target.value)}
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
                  {suggestionListFetchedData?.length === 0 && (
                    <Typography>موردی یافت نشد.</Typography>
                  )}
                  {suggestionListFetchedData.map((props, index) => (
                    <SearchedProductWithThumbnail key={index} {...props} />
                  ))}
                  {suggestionListFetchedData.map((props, index) => (
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
      </Grid>

      <Grid
        display={"flex"}
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={4}
        mb={3}
        px={4}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <Image src={Sort} width={25} height={25} alt={"Sort"} />
            <Typography>مرتب سازی:</Typography>
          </Box>

          <Typography
            color={"common.textGrey"}
            sx={{ color: "primary.main", fontWeight: "bold" }}
          >
            مرتبط ترین
          </Typography>
          <Typography color={"common.textGrey"}>پرفروش ترین</Typography>
          <Typography color={"common.textGrey"}>ارزان ترین</Typography>
          <Typography color={"common.textGrey"}>گران ترین</Typography>
        </Box>

        <Typography>
          {fetchedData?.length} {"کالا"}
        </Typography>
      </Grid>

      <Grid container px={4} pb={4}>
        {fetchedData &&
          fetchedData?.length > 0 &&
          fetchedData.map((props, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <ProductThumbnail {...props} />
            </Grid>
          ))}
      </Grid>
    </>
  );
}
