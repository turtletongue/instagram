import { Box, Center, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import DownloadApp from "../../components/download-app/download-app.component";
import LoadingScreen from "../../components/loading-screen/loading-screen.component";
import MockupSlider from "../../components/mockup-slider/mockup-slider.component";
import SignInCard from "../../components/signin-card/signin-card.component";
import SignUpRefCard from "../../components/signup-ref-card/signup-ref-card.component";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

const SignIn = () => {
  const pageLoading: string = useAppSelector(
    (state: RootState) => state.signIn.pageLoading
  );
  const [isLessThan825] = useMediaQuery("(max-width: 825px)");
  return (
    <>
      <Center w="100%" h="100vh" bgColor="#fafafa">
        <Flex h="90%">
          {isLessThan825 ? <></> : <MockupSlider />}
          <Box h="100%" mt="2rem">
            <SignInCard />
            <SignUpRefCard />
            <Text
              mt="1rem"
              textAlign="center"
              fontSize="sm"
              position="relative"
              left={isLessThan825 ? "0" : "-2rem"}
            >
              Get the app.
            </Text>
            <DownloadApp />
          </Box>
        </Flex>
      </Center>
      {pageLoading === "loading" ? <LoadingScreen /> : <></>}
    </>
  );
};

export default SignIn;
