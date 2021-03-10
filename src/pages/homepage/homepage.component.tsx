import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrentUser from "../../components/current-user/current-user.component";
import Feed from "../../components/feed/feed.component";
import Header from "../../components/header/header.component";
import LoadingScreen from "../../components/loading-screen/loading-screen.component";
import { fetchEmojies } from "../../redux/emojies/emojies.actions";
import { fetchPosts } from "../../redux/posts/posts.actions";
import { State } from "../../redux/store";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchEmojies());
  }, [dispatch]);
  const [isLessThan820] = useMediaQuery("(max-width: 820px)");
  const isLoading = useSelector((state: State) => state.posts.isPostsPending);
  return (
    <>
      {!isLoading ? (
        <Box w="100%" minH="100vh" bgColor="#fafafa">
          <Header />
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
