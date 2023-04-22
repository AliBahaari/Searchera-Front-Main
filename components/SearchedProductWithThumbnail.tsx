import { Box, Grid, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";
import Link from "next/link";

type SearchedProductWithThumbnailProps = {
  hex_color: Array<string>;
  images_url: string;
  price: number;
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
  hex_color,
}: SearchedProductWithThumbnailProps) {
  return (
    <Grid
      container
      mb={2}
      borderBottom={1}
      borderColor={"common.borderColor"}
      pb={1}
    >
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
              fill
              src={images_url}
              style={{ objectFit: "contain" }}
              alt={title_fa}
              sizes="100%"
            />
          </div>
        </Link>

        <Grid
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={1}
          gap={0.5}
        >
          {hex_color?.map((colorHexCode) => (
            <Box
              key={colorHexCode}
              sx={{
                width: 10,
                height: 10,
                backgroundColor: colorHexCode,
                borderRadius: 10,
              }}
            ></Box>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={10} display={"flex"} flexDirection={"column"} pl={1}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
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
            <StarIcon sx={{ fontSize: 20, color: "common.goldenColor" }} />
          </Box>
        </Box>

        <Typography sx={{ alignSelf: "flex-end", fontWeight: 600 }}>
          {price !== 0
            ? `${parseInt(
                price?.toString()?.split("").slice(0, -1).join("")
              ).toLocaleString()} تومان`
            : "ناموجود"}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default SearchedProductWithThumbnail;
