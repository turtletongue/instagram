import { Box, useMediaQuery } from "@chakra-ui/react";
import { IPost } from "../../redux/posts/posts.interfaces";
import PostContainer from "../post-container/post-container.component";

const Feed = () => {
  const [isLessThan820] = useMediaQuery("(max-width: 820px)");
  const posts: IPost[] = [];
  return (
    <Box p={isLessThan820 ? "3rem 0 0 0" : "6rem 0 1rem 12rem"}>
      {posts.map((post) => {
        return <PostContainer key={post.id} post={post} />;
      })}
    </Box>
  );
};

export default Feed;
