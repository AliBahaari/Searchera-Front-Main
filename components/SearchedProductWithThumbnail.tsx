import { Box, Grid, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";
import Link from "next/link";

type SearchedProductWithThumbnailProps = {
  color: Array<string>;
  id: number;
  images_url: string;
  price: number;
  rate: number;
  rate_star: number;
  title_fa: string;
  url: string;
};

function SearchedProductWithThumbnail({
  title_fa,
  images_url,
  url,
  rate_star,
  price,
}: SearchedProductWithThumbnailProps) {
  return (
    <Grid container mb={2} borderBottom={1} borderColor={"#EEE"} pb={1}>
      <Grid item xs={2}>
        <Link href={"https://www.digikala.com" + url} target="_blank">
          <div
            style={{
              width: "90%",
              height: "60px",
              position: "relative",
              margin: "0 auto",
            }}
          >
            <Image
              src={images_url}
              layout="fill"
              objectFit="contain"
              alt={title_fa}
            />
          </div>
        </Link>
      </Grid>
      <Grid item xs={10} display={"flex"} flexDirection={"column"} pl={1}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: " center",
            gap: 4,
          }}
        >
          <Link
            href={"https://www.digikala.com" + url}
            target="_blank"
            style={{ color: "#414266", textDecoration: "none" }}
          >
            <Typography>{title_fa}</Typography>
          </Link>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Typography variant="caption">{rate_star}</Typography>
            <StarIcon sx={{ fontSize: 20, color: "common.golden" }} />
          </Box>
        </Box>

        <Typography sx={{ alignSelf: "flex-end" }}>
          {price.toLocaleString()} {"تومان"}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default SearchedProductWithThumbnail;
