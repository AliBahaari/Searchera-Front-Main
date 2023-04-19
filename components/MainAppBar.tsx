import { Toolbar, Typography, AppBar } from "@mui/material";
import SearcheraLogoWhite from "@/public/images/Searchera-Logo-White.svg";
import Image from "next/image";

function MainAppBar() {
  return (
    <AppBar position="relative" elevation={1}>
      <Toolbar
        sx={{
          background: "primary.main",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: 1,
          p: 1,
        }}
      >
        <Typography
          sx={{
            color: "common.white",
            fontSize: { xs: 16, sm: 20 },
            fontWeight: "bold",
          }}
        >
          جستجو سریع و راحت با
        </Typography>

        <Image
          src={SearcheraLogoWhite}
          width={130}
          height={undefined}
          alt="Searchera Logo"
        />
      </Toolbar>
    </AppBar>
  );
}

export default MainAppBar;
