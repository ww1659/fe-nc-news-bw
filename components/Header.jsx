import { Container, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "left",
        paddingTop: "10px",
      }}
    >
      <Typography variant="h3">NC News</Typography>
    </Container>
  );
};
