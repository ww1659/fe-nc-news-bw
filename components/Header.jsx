import { Container, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Container
      sx={{
        display: "flex",
      }}
    >
      <Typography variant="h4">NC NEWS</Typography>
    </Container>
  );
};
