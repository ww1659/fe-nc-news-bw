/* eslint-disable react/prop-types */
import { Pagination, Stack } from "@mui/material";

export const PaginateArticles = ({ page, setPage }) => {
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <Stack margin={2} justifyContent="center" direction="row">
      <Pagination
        count={4}
        shape="rounded"
        variant="outlined"
        color="secondary"
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
};
