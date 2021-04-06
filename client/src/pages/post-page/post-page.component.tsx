import { Flex, Text } from "@chakra-ui/layout";
import { useEffect } from "react";
import { useParams } from "react-router";
import Header from "../../components/header/header.component";
import LoadingScreen from "../../components/loading-screen/loading-screen.component";
import PostContainer from "../../components/post-container/post-container.component";
import { POST_PAGE } from "../../constants";
import { IPost } from "../../redux/feed/feed.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { requestPostById } from "../../redux/post-page/post-page.slice";
import { RootState } from "../../redux/store";

const PostPage = () => {
  const params: any = useParams();
  const postId = params.postId;
  const dispatch = useAppDispatch();
  const token: string | null = localStorage.getItem("authToken");
  useEffect(() => {
    if (token) {
      dispatch(requestPostById({ input: { postId: +postId, token } }));
    }
  }, [dispatch, postId, token]);
  const isLoading: boolean = useAppSelector(
    (state: RootState) => state.postPage.postLoading === "loading"
  );
  const post: IPost | null = useAppSelector(
    (state: RootState) => state.postPage.post
  );
  return (
    <>
      <Header />
      {!isLoading ? (
        <Flex
          w="100%"
          minH="100vh"
          bgColor="#fafafa"
          align="center"
          justify="center"
          p="3rem 0 1rem 0"
        >
          {post ? (
            <PostContainer post={post} full page={POST_PAGE} />
          ) : (
            <Text fontSize="3xl" color="gray.500" fontWeight="500">
              POST NOT FOUND
            </Text>
          )}
        </Flex>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default PostPage;
