import { Center, Flex, Box, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { State } from '../../redux/store';
import MockupSlider from '../../components/mockup-slider/mockup-slider.component';
import SignInCard from '../../components/signin-card/signin-card.component';
import SignUpRefCard from '../../components/signup-ref-card/signup-ref-card.component';
import DownloadApp from '../../components/download-app/download-app.component';
import LoadingScreen from '../../components/loading-screen/loading-screen.component';

const SignIn = () => {
  const isPending: boolean = useSelector((state: State) => state.signIn.isPending);
  return (
    <>
      <Center
        w="100vw"
        h="100vh"
        bgColor="#fafafa"
      >
        <Flex h="90%">
          <MockupSlider />
          <Box h="100%" mt="2rem">
            <SignInCard />
            <SignUpRefCard />
            <Text
              mt="1rem"
              textAlign="center"
              fontSize="sm"
              position="relative"
              left="-2rem"
            >Get the app.</Text>
            <DownloadApp />
          </Box>
        </Flex>
      </Center>
      {
        isPending ? <LoadingScreen /> : <></>
      }
    </>
  );
}

export default SignIn;