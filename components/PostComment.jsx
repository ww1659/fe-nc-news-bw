// import {
//   Box,
//   Button,
//   Container,
//   Divider,
//   Grid,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { Crossbar } from "./Crossbar";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { fetchArticleById, fetchComments, updateComments } from "../utils/api";
// import PostAddIcon from "@mui/icons-material/PostAdd";

// export const PostComment = () => {
//   const [isLoading, setIsLoading] = useState();
//   const [error, setError] = useState();
//   const [userInput, setUserInput] = useState("");
//   const [comments, setComments] = useState([]);
//   const [article, setArticle] = useState([{}]);

//   const { articleId } = useParams();

//   useEffect(() => {
//     setIsLoading(true);
//     fetchArticleById(articleId)
//       .then((fetchedArticle) => {
//         setIsLoading(false);
//         setArticle(fetchedArticle);
//       })
//       .catch((err) => {
//         setIsLoading(false);
//         setError(err);
//       });
//   }, [articleId]);

//   useEffect(() => {
//     setIsLoading(true);
//     fetchComments(articleId)
//       .then((fetchedComments) => {
//         setIsLoading(false);
//         setComments(fetchedComments);
//       })
//       .catch((err) => {
//         setIsLoading(false);
//         setError(err);
//       });
//   }, [articleId]);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const newComment = {
//       body: userInput,
//       votes: 0,
//       author: "cooljmessy",
//       article_id: articleId,
//       created_at: Date.now,
//     };
//     setComments((currentComments) => {
//       return [...currentComments, newComment];
//     });
//     setUserInput("");
//     updateComments(articleId, newComment).catch((err) => {
//       console.log(err);
//       setError("Something went wrong, please refresh...");
//     });
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   console.log(comments);

//   return (
//     <Container>
//       <Crossbar />
//       <Box style={{ marginTop: 70 }}>
//         <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
//         <Grid container>
//           <Grid item>
//             <Typography variant="subtitle1" style={{ fontWeight: "lighter" }}>
//               {article[0].title}
//             </Typography>
//           </Grid>
//         </Grid>
//         <Divider variant="fullWidth" style={{ margin: "10px 0" }} />
//       </Box>
//       <Box>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             required
//             id="outlined-multiline-static"
//             label="Your comment"
//             multiline
//             rows={7}
//             fullWidth
//             color="secondary"
//             value={userInput}
//             onChange={(event) => setUserInput(event.target.value)}
//           />
//           <Button
//             type="submit"
//             variant="outlined"
//             color="inherit"
//             startIcon={<PostAddIcon />}
//             sx={{
//               mt: "5%",
//               ":hover": {
//                 bgcolor: "secondary.main",
//                 color: "white",
//               },
//             }}
//           >
//             POST
//           </Button>
//         </form>
//       </Box>
//     </Container>
//   );
// };
