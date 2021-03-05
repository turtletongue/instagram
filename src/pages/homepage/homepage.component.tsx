import { Box } from '@chakra-ui/react';
import Header from '../../components/header/header.component';
import Feed from '../../components/feed/feed.component';

const HomePage = () => {
  return (
    <Box
      w="100vw"
      minH="100vh"
      bgColor="#fafafa"
    >
      <Header />
      <Feed />
    </Box>
  );
}

export default HomePage;