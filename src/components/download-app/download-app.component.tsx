import { Flex, Image, useMediaQuery } from '@chakra-ui/react';

const DownloadApp = () => {
  const [isLessThan825] = useMediaQuery("(max-width: 825px)");
  return (
    <Flex
      mt="1rem"
      position="relative"
      left={isLessThan825 ? "0" : "-2rem"}
      align="center"
      justify="Center"
    >
      <Image
        src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
        alt="App Store"
        maxW="9rem"
        cursor="pointer"
        sx={{
          '&:active': {
            opacity: 0.6
          }
        }}
      />
      <Image
        ml="0.5rem"
        src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
        alt="Google Play"
        maxW="9rem"
        cursor="pointer"
        sx={{
          '&:active': {
            opacity: 0.6
          }
        }}
      />
    </Flex>
  );
}

export default DownloadApp;