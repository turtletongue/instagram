import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import CurrentUser from "../../components/current-user/current-user.component";
import Feed from "../../components/feed/feed.component";
import Header from "../../components/header/header.component";
import LoadingScreen from "../../components/loading-screen/loading-screen.component";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

const HomePage = () => {
  const [isLessThan820] = useMediaQuery("(max-width: 820px)");
  const isLoading = useAppSelector((state: RootState) =>
    state.feed.postsLoading === "loading" ? true : false
  );
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
