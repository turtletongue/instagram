import { Box, Spinner, useMediaQuery } from "@chakra-ui/react";
import { IPost, selectAllPosts } from "../../redux/feed/feed.slice";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import PostContainer from "../post-container/post-container.component";

const Feed = () => {
  const [isLessThan820] = useMediaQuery("(max-width: 820px)");
  const posts: unknown[] = selectAllPosts(
    useAppSelector((state: RootState) => state)
  );
  const isSliceLoading: boolean = useAppSelector(
    (state: RootState) => state.feed.postsLoading === "loading"
  );
  return (
    <Box p={isLessThan820 ? "3rem 0 0 0" : "6rem 0 1rem 12rem"}>
      {(posts as IPost[])
        .sort(
          (a: IPost, b: IPost) =>
            Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
        )
        .map((post, index) => {
          return <PostContainer key={index} post={post} />;
        })}
      {isSliceLoading ? (
        <Box
          p={isLessThan820 ? "3rem 1rem 0 43vw " : "6rem 0 1rem 12rem"}
          m="1rem 0"
        >
          <Spinner color="black" size="lg" />
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Feed;
