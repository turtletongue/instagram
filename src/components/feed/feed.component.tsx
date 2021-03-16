import { Box, useMediaQuery } from "@chakra-ui/react";
import { IPost, selectAllPosts } from "../../redux/feed/feed.slice";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import PostContainer from "../post-container/post-container.component";

const Feed = () => {
  const [isLessThan820] = useMediaQuery("(max-width: 820px)");
  const posts: unknown[] = selectAllPosts(
    useAppSelector((state: RootState) => state)
  );
  return (
    <Box p={isLessThan820 ? "3rem 0 0 0" : "6rem 0 1rem 12rem"}>
      {(posts as IPost[]).map((post, index) => {
        return <PostContainer key={index} post={post} />;
      })}
    </Box>
  );
};

export default Feed;
