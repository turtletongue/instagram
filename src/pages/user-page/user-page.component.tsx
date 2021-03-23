import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Center, Divider, Flex, Spacer, Text } from "@chakra-ui/layout";
import { useEffect } from "react";
import { useParams } from "react-router";
import Avatar from "../../components/avatar/avatar.component";
import Categories from "../../components/categories/categories.component";
import ChangePhotoModal from "../../components/change-photo-modal/change-photo-modal.component";
import Header from "../../components/header/header.component";
import NoPostsBanner from "../../components/no-posts-banner/no-posts-banner.component";
import ProfileData from "../../components/profile-data/profile-data.component";
import UserPosts from "../../components/user-posts/user-posts.component";
import { IPost } from "../../redux/feed/feed.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  POSTS,
  requestUserData,
  requestUserPagePosts,
  selectAllUserPagePosts,
} from "../../redux/user-page/user-page.slice";
import { IUser } from "../../redux/user/user.slice";

const UserPage = () => {
  const params: any = useParams();
  const userId: string = params.userId;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      requestUserData({
        testData: {
          userId: "lustervolt",
          avatarUrl:
            "https://scontent-frt3-2.cdninstagram.com/v/t51.2885-19/s150x150/72549396_389185031989753_382381312025034752_n.jpg?tp=1&_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_ohc=x7AMNhpuNJUAX_eghOn&oh=b3fc4b38bd8450a60f749677d408e8ba&oe=60782C28",
          fullname: "Volt Luster",
          followers: [
            {
              userId: "lustervolt1",
              fullname: "Shrimp Shrimp",
              avatarUrl:
                "https://scontent-frt3-2.cdninstagram.com/v/t51.2885-19/s150x150/72549396_389185031989753_382381312025034752_n.jpg?tp=1&_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_ohc=x7AMNhpuNJUAX_eghOn&oh=b3fc4b38bd8450a60f749677d408e8ba&oe=60782C28",
            },
            {
              userId: "lustervolt2",
              fullname: "Shrimp Shrimp",
              avatarUrl:
                "https://scontent-frt3-2.cdninstagram.com/v/t51.2885-19/s150x150/72549396_389185031989753_382381312025034752_n.jpg?tp=1&_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_ohc=x7AMNhpuNJUAX_eghOn&oh=b3fc4b38bd8450a60f749677d408e8ba&oe=60782C28",
            },
          ],
          following: [
            {
              userId: "lustervolt1",
              fullname: "Shrimp Shrimp",
              avatarUrl:
                "https://scontent-frt3-2.cdninstagram.com/v/t51.2885-19/s150x150/72549396_389185031989753_382381312025034752_n.jpg?tp=1&_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_ohc=x7AMNhpuNJUAX_eghOn&oh=b3fc4b38bd8450a60f749677d408e8ba&oe=60782C28",
            },
            {
              userId: "lustervolt2",
              fullname: "Shrimp Shrimp",
              avatarUrl:
                "https://scontent-frt3-2.cdninstagram.com/v/t51.2885-19/s150x150/72549396_389185031989753_382381312025034752_n.jpg?tp=1&_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_ohc=x7AMNhpuNJUAX_eghOn&oh=b3fc4b38bd8450a60f749677d408e8ba&oe=60782C28",
            },
          ],
        },
      })
    );
    dispatch(
      requestUserPagePosts({
        testData: [
          {
            id: 32324,
            author: {
              userId: "lustervolt",
              fullname: "Volt Luster",
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
            createdAt: new Date().toISOString(),
            comments: [
              {
                id: 1,
                postId: 32324,
                authorId: "lindsayjmariiiie",
                content: "@lindsayjmarie",
                writedAt: new Date(2021, 2, 5).toISOString(),
                likersIds: [],
                isLiked: false,
                replies: [],
              },
              {
                id: 2,
                postId: 32324,
                authorId: "lindsayjmarie",
                content: "Hello there!",
                writedAt: new Date(2021, 2, 5).toISOString(),
                likersIds: [],
                isLiked: false,
                replies: [],
              },
            ],
          },
        ],
      })
    );
  }, [dispatch, userId]);
  const state: RootState = useAppSelector((state: RootState) => state);
  const user: IUser | null = useAppSelector(
    (state: RootState) => state.userPage.user
  );
  const category: string = useAppSelector(
    (state: RootState) => state.userPage.category
  );
  const userPagePostsData: unknown[] = selectAllUserPagePosts(state);
  const userPagePosts: IPost[] = userPagePostsData as IPost[];
  const userPosts: IPost[] = userPagePosts.filter(
    (post: IPost) => post.author.userId === user?.userId
  );
  const savedPosts: IPost[] = userPagePosts.filter(
    (post: IPost) => post.isBookmarked
  );
  const {
    isOpen: isChangePhotoModalOpen,
    onOpen: onChangePhotoModalOpen,
    onClose: onChangePhotoModalClose,
  } = useDisclosure();
  return (
    <>
      <Header />
      <Box
        p={user ? "5rem 0 1rem 12rem" : "5rem 0 1rem 0"}
        w="100%"
        minH="100vh"
        bgColor="#fafafa"
      >
        {user ? (
          <>
            <ChangePhotoModal
              isOpen={isChangePhotoModalOpen}
              onClose={onChangePhotoModalClose}
            />
            <Flex align="center" ml="4rem" maxW="33rem">
              <Avatar
                w="9rem"
                h="9rem"
                src={user.avatarUrl}
                onClick={onChangePhotoModalOpen}
              />
              <Spacer />
              <ProfileData user={user} postsCount={userPosts.length} />
            </Flex>
            <Divider mt="4rem" maxW="58rem" borderColor="#c7c7c7" />
            <Categories />
            <Center maxW="60rem">
              {category === POSTS ? (
                userPosts.length ? (
                  <UserPosts posts={userPosts} />
                ) : (
                  <NoPostsBanner />
                )
              ) : (
                <UserPosts posts={savedPosts} />
              )}
            </Center>
          </>
        ) : (
          <Flex minH="70vh" align="center" justify="center">
            <Text fontSize="3xl" color="gray.500" fontWeight="500">
              USER NOT FOUND
            </Text>
          </Flex>
        )}
      </Box>
    </>
  );
};

export default UserPage;
