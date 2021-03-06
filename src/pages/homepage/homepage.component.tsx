import { Box, Flex, Text } from '@chakra-ui/react';
import Header from '../../components/header/header.component';
import Feed from '../../components/feed/feed.component';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../redux/posts/posts.actions';

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  return (
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
  );
}

export default HomePage;