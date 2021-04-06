import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import DownloadApp from "../download-app/download-app.component";

const NoPostsBanner = () => {
  const [isLessThan820] = useMediaQuery("(max-width: 820px)");
  return (
    <Flex
      w="100%"
      align={isLessThan820 ? "" : "center"}
      mt="1rem"
      direction={isLessThan820 ? "column" : "row"}
    >
      {!isLessThan820 ? (
        <Image
          src="https://www.instagram.com/static/images/mediaUpsell.jpg/6efc710a1d5a.jpg"
          alt="Share your moments."
          maxW="22rem"
          maxH="22rem"
        />
      ) : (
        <></>
      )}
      <Flex
        h={isLessThan820 ? "12rem" : "22rem"}
        w={isLessThan820 ? "100%" : "70%"}
        p={isLessThan820 ? "1.5rem" : 0}
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
      {isLessThan820 ? (
        <Image
          src="https://www.instagram.com/static/images/mediaUpsell.jpg/6efc710a1d5a.jpg"
          alt="Share your moments."
        />
      ) : (
        <></>
      )}
    </Flex>
  );
};

export default NoPostsBanner;
