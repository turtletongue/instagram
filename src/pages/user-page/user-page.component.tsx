import { Box, Center, Divider, Flex, Spacer, Text } from "@chakra-ui/layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import Avatar from "../../components/avatar/avatar.component";
import Categories from "../../components/categories/categories.component";
import Header from "../../components/header/header.component";
import NoPostsBanner from "../../components/no-posts-banner/no-posts-banner.component";
import ProfileData from "../../components/profile-data/profile-data.component";
import UserPosts from "../../components/user-posts/user-posts.component";
import { fetchPosts } from "../../redux/posts/posts.actions";
import { IPost } from "../../redux/posts/posts.interfaces";
import { POSTS_TAB } from "../../redux/user-page/user-page.constants";
import { fetchUser } from "../../redux/users/users.actions";
import { IUser } from "../../redux/users/users.interfaces";

const UserPage = () => {
  const params: any = useParams();
  const userId: string = params.userId;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser(userId));
    dispatch(fetchPosts(userId));
  }, [dispatch, userId]);
  const user: IUser | undefined = {
    id: "1",
    avatar: "",
    fullname: "",
    description: "",
  };
  const category: string = "";
  const userPosts: IPost[] = [];
  const savedPosts: IPost[] = [];
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
            <Flex align="center" ml="4rem" maxW="33rem">
              <Avatar w="9rem" h="9rem" src={user.avatar} />
              <Spacer />
              <ProfileData user={user} />
            </Flex>
            <Divider mt="4rem" maxW="58rem" borderColor="#c7c7c7" />
            <Categories />
            <Center maxW="60rem">
              {category === POSTS_TAB ? (
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
