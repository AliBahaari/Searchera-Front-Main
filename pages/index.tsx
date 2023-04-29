import {
  Box,
  ClickAwayListener,
  Divider,
  Grid,
  Popper,
  TextField,
  Typography,
  filledInputClasses,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SearchedProductWithThumbnail from "@/components/SearchedProductWithThumbnail";
import Logo from "@/public/images/Logo.svg";
import CancelIcon from "@mui/icons-material/Cancel";
import Image from "next/image";
import MainAppBar from "@/components/MainAppBar";
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
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
  },
}));

export default function Home() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const suggestionListRef = useRef(null);
  const [fetchedData, setFetchedData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchQuery(searchText: string) {
      const fetchQueryRequest = await axios.post(
        "http://127.0.0.1:5000/api/search",
        {
          input_searchbox: String(searchText),
          input_type: 0,
        }
      );

      if (fetchQueryRequest.data.length > 0) {
        const availableProducts = (fetchQueryRequest.data as any[]).filter(
          (_) => _.price !== 0
        );
        availableProducts.sort((prevProduct, nextProduct) =>
          prevProduct.rate_star < nextProduct.rate_star ? 1 : -1
        );

        setFetchedData(availableProducts.filter((_, index) => index < 5));
      }

      setAnchorEl(suggestionListRef.current);
    }

    setFetchedData([]);

    if (searchText.length > 0) {
      fetchQuery(searchText);
    } else setAnchorEl(null);
  }, [searchText]);

  return (
    <>
      {/* <MainAppBar /> */}

      <Box
        sx={{
          height: "calc(50vh)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link href={"/"}>
          <Image
            style={{ margin: "0 auto", display: "block" }}
            src={Logo}
            width={200}
            height={undefined}
            alt={"Logo"}
          />
        </Link>

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
            <Grid maxWidth={"100%"} width={500}>
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
                    borderBottom: searchText.length ? 0 : 1,
                    borderBottomColor: "transparent",
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
                    pt: 0,
                    mb: 10,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)",
                    width:
                      // @ts-ignore
                      suggestionListRef.current?.offsetWidth,
                  }}
                >
                  <Box
                    sx={{
                      height: 2,
                      backgroundColor: "common.suggestionListBorderColor",
                      mb: 2,
                    }}
                  ></Box>

                  {fetchedData?.length === 0 && (
                    <Typography>موردی یافت نشد.</Typography>
                  )}
                  {fetchedData.map((props, index) => (
                    <>
                      <SearchedProductWithThumbnail key={index} {...props} />

                      {fetchedData?.length - 1 > index && (
                        <Divider sx={{ mb: 2 }} />
                      )}
                    </>
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
