import { Flex, Text } from "@chakra-ui/layout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Header from "../../components/header/header.component";
import LoadingScreen from "../../components/loading-screen/loading-screen.component";
import PostContainer from "../../components/post-container/post-container.component";
import { fetchEmojies } from "../../redux/emojies/emojies.actions";
import { fetchPosts } from "../../redux/posts/posts.actions";
import { IPost } from "../../redux/posts/posts.interfaces";
import { State } from "../../redux/store";

const PostPage = () => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const postId = params.postId;
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchEmojies());
  }, [dispatch]);
  const isLoading = useSelector((state: State) => state.posts.isPostsPending);
  const posts: IPost[] = useSelector((state: State) => state.posts.postsData);
  const post: IPost | undefined = posts.find(
    (post: IPost) => post.id === postId
  );
  return (
    <>
      {!isLoading ? (
        <Flex
          w="100%"
          minH="100vh"
          bgColor="#fafafa"
          align="center"
          justify="center"
          p="3rem 0 1rem 0"
        >
          <Header />
          {post ? (
            <PostContainer post={post} />
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
