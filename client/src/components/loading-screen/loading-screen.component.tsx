import { Center, Icon } from '@chakra-ui/react';
import { FiInstagram } from 'react-icons/fi';

const LoadingScreen = () => {
  return (
    <Center
      position="absolute"
      top={0}
      w="100vw"
      h="100vh"
      bgColor="#fafafa"
      zIndex="2"
    >
      <Icon
        as={FiInstagram}
        color="gray.400"
        w={12}
        h={12}
      />
    </Center>
  );
}

export default LoadingScreen;