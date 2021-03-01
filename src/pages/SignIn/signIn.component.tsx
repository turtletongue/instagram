import { Center, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { State } from '../../redux/store';
import MockupSlider from '../../components/mockup-slider/mockup-slider.component';
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
        </Flex>
      </Center>
      {
        isPending ? <LoadingScreen /> : <></>
      }
    </>
  );
}

export default SignIn;