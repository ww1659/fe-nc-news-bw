import { Box, Button } from "@mui/material";

export const CommentBar = () => {
  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      backgroundColor="#fff"
      zIndex={9999}
    >
      <Button variant="outlined" onClick={() => {}}>
        Post Comment
      </Button>
    </Box>
  );
};
