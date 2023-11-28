import { Box, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
      }}
    >
      <Typography color="white" variant="overline" sx={{ fontSize: "24px" }}>
        NC NEWS
      </Typography>
    </Box>
  );
};
