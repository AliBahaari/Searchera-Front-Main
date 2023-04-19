import {
  Box,
  ClickAwayListener,
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
import SearchedProduct from "@/components/SearchedProduct";
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
  const query = router.query.query;
  const [fetchedData, setFetchedData] = useState<any[]>([]);

  useEffect(() => {
    setFetchedData([]);

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
            setFetchedData(allData);
          }
        });

      setAnchorEl(suggestionListRef.current);
    } else setAnchorEl(null);
  }, [searchText, query]);

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
                      suggestionListRef.current?.offsetWidth -
                      (fetchedData.length ? 10 : 0),
                  }}
                >
                  {fetchedData?.length === 0 && (
                    <Typography>موردی یافت نشد.</Typography>
                  )}
                  {fetchedData.slice(0, 6).map((props, index) => (
                    <SearchedProductWithThumbnail key={index} {...props} />
                  ))}
                  {fetchedData.slice(6, 11).map((props, index) => (
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
