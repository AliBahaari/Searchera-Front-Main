import { Box, Chip, Grid, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";
import Link from "next/link";
import Rocket from "@/public/icons/Rocket.svg";
import Truck from "@/public/icons/Truck.svg";

const styleProps = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 1,
};

type ProductThumbnailProps = {
  digiplus_delivery: Array<string>;
  color: Array<string>;
  id: number;
  images_url: string;
  price: number;
  rate: number;
  rate_star: number;
  title_fa: string;
  url: string;
};

export default function ProductThumbnail({
  title_fa,
  rate_star,
  digiplus_delivery,
  images_url,
  price,
  url,
}: ProductThumbnailProps) {
  return (
    <Box
      sx={{
        height: "100%",
        border: 1,
        borderColor: "common.borderColor",
      }}
    >
      <Link href={"https://www.digikala.com" + url} target="_blank">
        <div
          style={{
            width: "90%",
            height: "200px",
            position: "relative",
            margin: "0 auto",
            marginTop: "30px",
          }}
        >
          <Image
            fill
            src={images_url}
            style={{ objectFit: "contain" }}
            alt={title_fa}
            sizes="100%"
          />

          <Grid
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            width={20}
            height={"100%"}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                backgroundColor: "#000",
                borderRadius: 10,
              }}
            ></Box>
          </Grid>
        </div>
      </Link>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3 }}>
        <Chip
          label={digiplus_delivery[0]}
          icon={
            <Image
              src={Truck}
              width={20}
              height={20}
              alt={"Truck"}
              style={{ marginRight: 10 }}
            />
          }
          sx={{
            alignSelf: "flex-start",
            fontSize: 12,
            backgroundColor: "common.backgroundGrey",
            color: "common.textGrey",
          }}
        />

        <Link
          href={"https://www.digikala.com" + url}
          target="_blank"
          style={{
            color: "#414266",
            textDecoration: "none",
            textAlign: "justify",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 400 }}>
            {title_fa}
          </Typography>
        </Link>

        <Box sx={styleProps}>
          <Box sx={styleProps}>
            <Image src={Rocket} width={25} height={25} alt={"Rocket"} />
            <Typography variant="caption" color={"common.textGrey"}>
              ارسال امروز
            </Typography>
          </Box>

          <Box sx={styleProps}>
            <Typography variant="caption">{rate_star}</Typography>
            <StarIcon sx={{ fontSize: 20, color: "common.goldenColor" }} />
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {price !== 0
              ? `${parseInt(
                  price?.toString()?.split("").slice(0, -1).join("")
                ).toLocaleString()} تومان`
              : "ناموجود"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
