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
  requestUserPageSavedPosts,
  selectAllUserPagePosts,
} from "../../redux/user-page/user-page.slice";
import { IUser, requestUserById } from "../../redux/user/user.slice";

const UserPage = () => {
  const params: any = useParams();
  const username: string = params.username;
  const dispatch = useAppDispatch();
  const token: string | null = localStorage.getItem("authToken");
  const isUnfollowLoading: boolean = useAppSelector(
    (state: RootState) => state.userPage.unfollowLoading === "loading"
  );
  const isFollowLoading: boolean = useAppSelector(
    (state: RootState) => state.userPage.followLoading === "loading"
  );
  useEffect(() => {
    if (token) {
      dispatch(requestUserData({ input: { username } }));
      dispatch(requestUserPagePosts({ input: { username, token } }));
      dispatch(requestUserPageSavedPosts({ input: { token } }));
    }
  }, [dispatch, username, token, isUnfollowLoading, isFollowLoading]);
  const loggedUser: IUser | null = useAppSelector(
    (state: RootState) => state.user.currentUser
  );
  useEffect(() => {
    if ((!isUnfollowLoading || !isFollowLoading) && loggedUser?.id) {
      dispatch(requestUserById({ input: { userId: Number(loggedUser.id) } }));
    }
  }, [dispatch, isUnfollowLoading, isFollowLoading, loggedUser?.id]);
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
    (post: IPost) => post.author.id === user?.id
  );
  const savedPosts: IPost[] = userPagePosts.filter(
    (post: IPost) => post.isBookmarked
  );
  const isItLoggedUserPage: boolean = useAppSelector(
    (state: RootState) => state.user.currentUser?.id === user?.id
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
                ) : isItLoggedUserPage ? (
                  <NoPostsBanner />
                ) : (
                  <></>
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
