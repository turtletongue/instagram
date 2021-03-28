import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { useEffect } from "react";
import CurrentUser from "../../components/current-user/current-user.component";
import Feed from "../../components/feed/feed.component";
import Header from "../../components/header/header.component";
import LoadingScreen from "../../components/loading-screen/loading-screen.component";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearInputs } from "../../redux/signin/signin.slice";
import { RootState } from "../../redux/store";

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
  return (
    <>
      <Header />
      {!isLoading ? (
        <Box w="100%" minH="100vh" bgColor="#fafafa">
          <Flex>
            <Feed />
            {isLessThan820 ? <></> : <CurrentUser />}
          </Flex>
        </Box>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default HomePage;
