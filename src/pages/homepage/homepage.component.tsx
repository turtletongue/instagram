import { Box } from '@chakra-ui/react';
import Header from '../../components/header/header.component';

const HomePage = () => {
  return (
    <Box
      w="100vw"
      minH="100vh"
      bgColor="#fafafa"
    >
      <Header />
    </Box>
  );
}

export default HomePage;