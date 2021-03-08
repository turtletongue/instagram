import { Box, Flex, Text } from '@chakra-ui/react';
import Header from '../../components/header/header.component';
import Feed from '../../components/feed/feed.component';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/posts/posts.actions';
import { State } from '../../redux/store';
import LoadingScreen from '../../components/loading-screen/loading-screen.component';
import { fetchEmojies } from '../../redux/emojies/emojies.actions';

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchEmojies());
  }, [dispatch]);
  const isLoading = useSelector((state: State) => state.posts.isPostsPending);
  return (
    <>
      {
        !isLoading ? (
          <Box
            w="100%"
            minH="100vh"
            bgColor="#fafafa"
          >
            <Header />
            <Flex>
              <Feed />
              <Text ml="2rem" mt="6rem">Lorem ipsum dolor sit amet.</Text>
            </Flex>
          </Box>
        ) : <LoadingScreen />
      }
    </>
  );
}

export default HomePage;