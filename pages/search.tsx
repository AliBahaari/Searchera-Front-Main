import ProductThumbnail from "@/components/ProductThumbnail";
import {
  Box,
  Grid,
  Typography,
  styled,
  TextField,
  filledInputClasses,
  ClickAwayListener,
  Popper,
  CircularProgress,
  Backdrop,
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
import CancelIcon from "@mui/icons-material/Cancel";
import Link from "next/link";

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
  const suggestionListRef = useRef(null);
  const query = router.query.query;
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [suggestionListFetchedData, setSuggestionListFetchedData] = useState<
    any[]
  >([]);

  useEffect(() => {
    async function fetchQuery() {
      const fetchQueryRequest = await axios.post(
        "http://127.0.0.1:5000/api/amirhoseyn",
        {
          input_searchbox: String(query),
          input_type: 0,
        }
      );

      setFetchedData(fetchQueryRequest.data);
    }

    fetchQuery();
  }, [query]);

  useEffect(() => {
    setSuggestionListFetchedData([]);

    if (searchText.length > 0) {
      axios
        .post("http://127.0.0.1:5000/api/amirhoseyn", {
          input_searchbox: String(searchText),
          input_type: 0,
        })
        .then((result) => {
          if (result.data.length > 0) {
            let allData: any[] = [];

            result.data.forEach((i: any, index: number) => {
              if (index < 11) allData.push(i);
            });

            setSuggestionListFetchedData(allData);
          }
        });

      setAnchorEl(suggestionListRef.current);
    } else setAnchorEl(null);
  }, [searchText]);

  const [filterType, setFilterType] = useState<number>(0);

  const handleFiltering = async (inputType: number) => {
    setShowLoading(true);

    const fetchQueryRequest = await axios.post(
      "http://127.0.0.1:5000/api/amirhoseyn",
      {
        input_searchbox: String(query),
        input_type: inputType,
      }
    );

    setShowLoading(false);
    setFilterType(inputType);
    setFetchedData(fetchQueryRequest.data);
  };

  const [showLoading, setShowLoading] = useState<boolean>(false);

  return (
    <>
      <Backdrop
        sx={{
          color: "common.white",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={showLoading}
        onClick={() => setShowLoading((previousState) => !previousState)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

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
          <Link href={"/"}>
            <Image
              style={{ margin: "0 auto" }}
              src={Logo}
              width={100}
              height={undefined}
              alt={"Logo"}
            />
          </Link>
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
                sx={{
                  ["& .MuiInputBase-root"]: {
                    border: searchText.length && 1,
                    borderColor:
                      searchText.length &&
                      // @ts-ignore
                      "common.borderColor",
                    backgroundColor: searchText.length && "common.white",
                    borderBottomRightRadius: searchText.length ? 0 : 8,
                    borderBottomLeftRadius: searchText.length ? 0 : 8,
                    borderBottom: searchText.length && 1,
                    borderBottomColor:
                      searchText.length &&
                      // @ts-ignore
                      "common.suggestionListBorderColor",
                  },
                }}
                value={searchText}
                autoComplete="off"
                ref={suggestionListRef}
                fullWidth
                variant="filled"
                placeholder="دنبال چی می گردی؟"
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <SearchIcon sx={{ mr: 1, color: "common.iconColor" }} />
                  ),
                  endAdornment: (
                    <CancelIcon
                      onClick={() => setSearchText("")}
                      sx={{
                        ml: 1,
                        color: "common.iconColor",
                        display: searchText.length ? "block" : "none",
                        cursor: "pointer",
                      }}
                    />
                  ),
                }}
                onChange={(event) => setSearchText(event.target.value)}
                onKeyDown={(event) => {
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
                    height: "auto",
                    maxHeight: "50vh",
                    overflowY: "auto",
                    border: 1,
                    borderTop: 0,
                    borderColor: "common.borderColor",
                    backgroundColor: "common.white",
                    p: 2,
                    mb: 10,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    width:
                      // @ts-ignore
                      suggestionListRef.current?.offsetWidth,
                  }}
                >
                  {suggestionListFetchedData?.length === 0 && (
                    <Typography>موردی یافت نشد.</Typography>
                  )}
                  {suggestionListFetchedData.slice(0, 6).map((props, index) => (
                    <SearchedProductWithThumbnail key={index} {...props} />
                  ))}
                  {suggestionListFetchedData
                    .slice(6, 11)
                    .map((props, index) => (
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
            onClick={() => handleFiltering(0)}
            sx={{
              color: filterType === 0 ? "primary.main" : "common.black",
              fontWeight: filterType === 0 ? "bold" : "normal",
              cursor: "pointer",
            }}
          >
            مرتبط ترین
          </Typography>
          <Typography
            color={"common.textGrey"}
            onClick={() => handleFiltering(1)}
            sx={{
              color: filterType === 1 ? "primary.main" : "common.black",
              fontWeight: filterType === 1 ? "bold" : "normal",
              cursor: "pointer",
            }}
          >
            گران ترین
          </Typography>
          <Typography
            color={"common.textGrey"}
            onClick={() => handleFiltering(2)}
            sx={{
              color: filterType === 2 ? "primary.main" : "common.black",
              fontWeight: filterType === 2 ? "bold" : "normal",
              cursor: "pointer",
            }}
          >
            ارزان ترین
          </Typography>
          <Typography
            color={"common.textGrey"}
            onClick={() => handleFiltering(3)}
            sx={{
              color: filterType === 3 ? "primary.main" : "common.black",
              fontWeight: filterType === 3 ? "bold" : "normal",
              cursor: "pointer",
            }}
          >
            قیمت مناسب
          </Typography>
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
