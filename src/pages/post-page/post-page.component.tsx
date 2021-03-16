import { Flex, Text } from "@chakra-ui/layout";
import { useEffect } from "react";
import { useParams } from "react-router";
import Header from "../../components/header/header.component";
import LoadingScreen from "../../components/loading-screen/loading-screen.component";
import PostContainer from "../../components/post-container/post-container.component";
import { IPost } from "../../redux/feed/feed.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { requestPostById } from "../../redux/post-page/post-page.slice";
import { RootState } from "../../redux/store";

const PostPage = () => {
  const params: any = useParams();
  const postId = params.postId;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      requestPostById({
        testData: {
          id: postId,
          author: {
            userId: "alternative.disney",
            fullname: "Alternative Disney",
            avatarUrl:
              "https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s320x320/37180174_2128883647392391_2180509584274227200_n.jpg?tp=1&_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=p-XguE5bCK8AX9v4QS1&oh=80bd6ca7e744d819747cd5253d77a6fb&oe=606DB111",
          },
          imagesUrls: [
            "https://scontent-arn2-1.cdninstagram.com/v/t51.2885-15/fr/e15/s1080x1080/155789273_770007063608934_120234005437861096_n.jpg?tp=1&_nc_ht=scontent-arn2-1.cdninstagram.com&_nc_cat=1&_nc_ohc=hSW3tHEk1GYAX8xMnU2&oh=10f1ad2d881737396eacbbc8362bc0d4&oe=606D1DB9",
          ],
          likesCount: 2454,
          isLiked: false,
          isBookmarked: false,
          isDataVisible: false,
          createdAt: new Date(),
          comments: [
            {
              id: 1,
              postId: 32323,
              authorId: "lindsayjmariiiie",
              content: "@lindsayjmarie",
              writedAt: new Date(2021, 2, 5),
              likersIds: [],
              isLiked: false,
              replies: [],
            },
            {
              id: 2,
              postId: 32323,
              authorId: "lindsayjmarie",
              content: "Hello there!",
              writedAt: new Date(2021, 2, 5),
              likersIds: [],
              isLiked: false,
              replies: [],
            },
          ],
        },
      })
    );
  }, []);
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
            <PostContainer post={post} full />
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
