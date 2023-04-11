import ProductThumbnail from "@/components/ProductThumbnail";
import { Box, Grid, Typography, AppBar, Toolbar } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

export default function Search() {
  return (
    <>
      <AppBar position="relative" elevation={1}>
        <Toolbar
          sx={{
            background: ({ palette }) => palette.primary.main,
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              color: ({ palette }) => palette.common.white,
            }}
            variant="h3"
          >
            جستجو سریع و راحت با Searchera
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        my={3}
        px={4}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <SortIcon />
          <Typography>مرتب سازی:</Typography>
          <Typography
            color={"grey.600"}
            sx={{ color: "primary.main", fontWeight: "bold" }}
          >
            پرفروش ترین
          </Typography>
          <Typography color={"grey.600"}>مرتبط ترین</Typography>
          <Typography color={"grey.600"}>ارزان ترین</Typography>
          <Typography color={"grey.600"}>گران ترین</Typography>
        </Box>
        <Typography>27 کالا</Typography>
      </Grid>

      <Grid container px={4} pb={4}>
        {[0, 1, 2, 3, 4].map((i, index) => (
          <Grid item xs={3} key={index}>
            <ProductThumbnail />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
