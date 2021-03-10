import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/layout";
import { IoSettingsOutline } from "react-icons/io5";

const ProfileParams = () => {
  return (
    <Flex align="center">
      <Button
        ml="1rem"
        size="sm"
        fontWeight="500"
        bgColor="#fafafa"
        borderWidth="1px"
        borderColor="blackAlpha.400"
        sx={{
          "&:hover, &:focus": {
            bgColor: "#fafafa",
            boxShadow: "none",
          },
          "&:active": {
            boxShadow: "none",
            opacity: 0.6,
          },
        }}
      >
        Edit Profile
      </Button>
      <Icon as={IoSettingsOutline} ml="1rem" w={6} h={6} cursor="pointer" />
    </Flex>
  );
};

export default ProfileParams;
