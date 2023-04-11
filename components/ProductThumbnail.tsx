import { Box, Chip, Grid, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import RocketIcon from "@mui/icons-material/Rocket";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Image from "next/image";

type ProductThumbnailProps = {};

const styleProps = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 1,
};

export default function ProductThumbnail() {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: "grey.200",
      }}
    >
      <Box
        sx={{ width: "100%", height: "200px", backgroundColor: "#000" }}
      ></Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3 }}>
        <Chip
          label="ارسال رایگان"
          icon={<LocalShippingIcon color={"error"} />}
          sx={{ alignSelf: "flex-start", fontSize: 12, color: "grey.700" }}
        />

        <Typography variant="h5">تست</Typography>

        <Box sx={styleProps}>
          <Box sx={styleProps}>
            <RocketIcon sx={{ fontSize: 20 }} />
            <Typography variant="caption" color={"grey.700"}>
              ارسال امروز
            </Typography>
          </Box>

          <Box sx={styleProps}>
            <Typography variant="caption">4.5</Typography>
            <StarIcon sx={{ fontSize: 20 }} />
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="h5">82,190,000 تومان</Typography>
        </Box>
      </Box>
    </Box>
  );
}
