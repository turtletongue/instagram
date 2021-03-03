import { Center, Flex, Box, Text, useMediaQuery } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { State } from '../../redux/store';
import MockupSlider from '../../components/mockup-slider/mockup-slider.component';
import SignInCard from '../../components/signin-card/signin-card.component';
import SignUpRefCard from '../../components/signup-ref-card/signup-ref-card.component';
import DownloadApp from '../../components/download-app/download-app.component';
import LoadingScreen from '../../components/loading-screen/loading-screen.component';

const SignIn = () => {
  const isImagesPending: boolean = useSelector((state: State) => state.signIn.isImagesPending);
  const [isLessThan825] = useMediaQuery("(max-width: 825px)");
  return (
    <>
      <Center
        w="100%"
        h="100vh"
        bgColor="#fafafa"
      >
        <Flex h="90%">
          {
            isLessThan825
              ? <></>
              : <MockupSlider />
          }
          <Box h="100%" mt="2rem">
            <SignInCard />
            <SignUpRefCard />
            <Text
              mt="1rem"
              textAlign="center"
              fontSize="sm"
              position="relative"
              left={isLessThan825 ? "0" : "-2rem"}
            >Get the app.</Text>
            <DownloadApp />
          </Box>
        </Flex>
      </Center>
      {
        isImagesPending ? <LoadingScreen /> : <></>
      }
    </>
  );
}

export default SignIn;