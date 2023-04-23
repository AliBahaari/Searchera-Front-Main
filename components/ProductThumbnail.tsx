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
  digiPlus_delivery: Array<string>;
  hex_color: Array<string>;
  images_url: string;
  price: number;
  rate_star: number;
  title_fa: string;
  url: string;
};

export default function ProductThumbnail({
  title_fa,
  rate_star,
  digiPlus_delivery,
  images_url,
  price,
  url,
  hex_color,
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

          <Grid display={"flex"} justifyContent={"flex-end"}>
            <Grid
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              width={20}
              height={"100%"}
              gap={0.5}
            >
              {hex_color?.map((colorHexCode) => (
                <Box
                  key={colorHexCode}
                  sx={{
                    width: 8,
                    height: 8,
                    backgroundColor: colorHexCode,
                    borderRadius: 10,
                  }}
                ></Box>
              ))}
            </Grid>
          </Grid>
        </div>
      </Link>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3 }}>
        <Chip
          label={digiPlus_delivery[0]}
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
