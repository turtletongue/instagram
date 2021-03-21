import Icon from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/layout";
import { IoSettingsOutline } from "react-icons/io5";
import BorderButton from "../border-button/border-button.component";

const ProfileParams = () => {
  return (
    <Flex align="center">
      <BorderButton>Edit Profile</BorderButton>
      <Icon as={IoSettingsOutline} ml="1rem" w={6} h={6} cursor="pointer" />
    </Flex>
  );
};

export default ProfileParams;
