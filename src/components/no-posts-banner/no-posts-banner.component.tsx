import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import DownloadApp from "../download-app/download-app.component";

const NoPostsBanner = () => {
  return (
    <Flex w="100%" align="center" mt="1rem">
      <Image
        src="https://www.instagram.com/static/images/mediaUpsell.jpg/6efc710a1d5a.jpg"
        alt="Share your moments."
        maxW="22rem"
        maxH="22rem"
      />
      <Flex
        h="22rem"
        w="70%"
        align="center"
        justify="center"
        direction="column"
        bgColor="white"
      >
        <Text fontWeight="500" fontSize="lg">
          Start capturing and sharing your moments.
        </Text>
        <Text>Get the app to share your first photo or video.</Text>
        <DownloadApp left={0} />
      </Flex>
    </Flex>
  );
};

export default NoPostsBanner;
