import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import CardContainer from "../../components/card-container/card-container.component";
import DownloadApp from "../../components/download-app/download-app.component";
import SignUpCard from "../../components/signup-card/signup-card.component";

const SignUpPage = () => {
  return (
    <Center w="100%" minH="100vh" bgColor="#fafafa">
      <Flex>
        <Box h="100%" mt="2rem" mb="2rem">
          <SignUpCard />
          <CardContainer left={0} mt="0.5rem">
            <Flex>
              <Text fontSize="sm">Have an account?</Text>
              <Text
                as={Link}
                to="/"
                ml="0.3rem"
                color="#0095f6"
                fontWeight="500"
                fontSize="sm"
              >
                Log In
              </Text>
            </Flex>
          </CardContainer>
          <Text mt="1rem" textAlign="center" fontSize="sm" position="relative">
            Get the app.
          </Text>
          <DownloadApp left={0} />
        </Box>
      </Flex>
    </Center>
  );
};

export default SignUpPage;
