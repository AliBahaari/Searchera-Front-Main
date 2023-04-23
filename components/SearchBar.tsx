import {
  Box,
  Grid,
  Typography,
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

function SearchBar() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const suggestionListRef = useRef(null);
  const [suggestionListFetchedData, setSuggestionListFetchedData] = useState<
    any[]
  >([]);

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
        setSuggestionListFetchedData(
          (fetchQueryRequest.data as any[])
            .filter((_) => _.price !== 0)
            .filter((_, index) => index < 5)
        );
      }

      setAnchorEl(suggestionListRef.current);
    }

    setSuggestionListFetchedData([]);

    if (searchText.length > 0) {
      fetchQuery(searchText);
    } else setAnchorEl(null);
  }, [searchText]);

  return (
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
              value={searchText || router.query.query}
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
                {suggestionListFetchedData.map((props, index) => (
                  <SearchedProductWithThumbnail key={index} {...props} />
                ))}
              </Box>
            </Popper>
          </Grid>
        </ClickAwayListener>
      </Grid>
    </Grid>
  );
}

export default SearchBar;
