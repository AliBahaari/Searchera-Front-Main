import ProductThumbnail from "@/components/ProductThumbnail";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { useCallback, useEffect, useState, memo } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import Sort from "@/public/icons/Sort.svg";

function AllProducts() {
  const router = useRouter();
  const query = router.query.query;
  const [fetchedData, setFetchedData] = useState<any[]>([]);

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

  const [filterType, setFilterType] = useState<number>(0);

  const handleFiltering = useCallback(
    async (inputType: number) => {
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
    },
    [query]
  );

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
          fetchedData.map((props) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={props.id}>
              <ProductThumbnail {...props} />
            </Grid>
          ))}
      </Grid>
    </>
  );
}

export default AllProducts;
