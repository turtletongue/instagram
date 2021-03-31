import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import CurrentUser from "../../components/current-user/current-user.component";
import Feed from "../../components/feed/feed.component";
import Header from "../../components/header/header.component";
import {
  incrementPostSlice,
  requestSliceOfPosts,
} from "../../redux/feed/feed.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearInputs } from "../../redux/signin/signin.slice";
import { RootState } from "../../redux/store";
import { IUser } from "../../redux/user/user.slice";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const [isLessThan820] = useMediaQuery("(max-width: 820px)");
  const isLoading = useAppSelector((state: RootState) =>
    state.feed.postsLoading === "loading" ? true : false
  );

  const isAuth: boolean = useAppSelector(
    (state: RootState) => state.user.isLoggedIn
  );

  useEffect(() => {
    if (isAuth) {
      dispatch(clearInputs());
    }
  }, [dispatch, isAuth]);

  const userFollowing: IUser[] | undefined = useAppSelector(
    (state: RootState) => state.user.currentUser?.following
  );
  const token: string | null = localStorage.getItem("authToken");
  const slice: number = useAppSelector(
    (state: RootState) => state.feed.lastPostsSlice
  );
  useEffect(() => {
    dispatch(requestSliceOfPosts({ input: { slice, token } }));
  }, [dispatch, slice, token, userFollowing]);

  const scrollHandler = useCallback(() => {
    const windowRelativeBottom: number = document.documentElement.getBoundingClientRect()
      .bottom;
    if (
      windowRelativeBottom < document.documentElement.clientHeight + 100 &&
      !isLoading
    ) {
      dispatch(incrementPostSlice());
    }
  }, [dispatch, isLoading]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => document.removeEventListener("scroll", scrollHandler);
  }, [isLoading, scrollHandler]);
  return (
    <>
      <Header />
      <Box w="100%" minH="100vh" bgColor="#fafafa">
        <Flex>
          <Feed />
          {isLessThan820 ? <></> : <CurrentUser />}
        </Flex>
      </Box>
    </>
  );
};

export default HomePage;
