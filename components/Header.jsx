import { Container, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <Typography variant="h3">Articles</Typography>
    </Container>
  );
};
