import { Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

type SearchedProductProps = {
  color: Array<string>;
  id: number;
  images_url: string;
  price: number;
  rate: number;
  rate_star: number;
  title_fa: string;
  url: string;
  searchText: string;
};

function SearchedProduct({ searchText, title_fa, url }: SearchedProductProps) {
  return (
    <Box>
      <Link
        href={"https://www.digikala.com" + url}
        target="_blank"
        style={{
          color: "#414266",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <SearchIcon
          sx={{
            fontSize: 20,
            color: "common.textGrey",
          }}
        />
        <Typography>{searchText}</Typography>
        <Typography sx={{ fontWeight: "700" }}>
          {title_fa.slice(0, 30) + "..."}
        </Typography>
      </Link>
    </Box>
  );
}

export default SearchedProduct;
