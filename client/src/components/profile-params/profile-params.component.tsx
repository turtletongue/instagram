import { useDisclosure } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/layout";
import { IoSettingsOutline } from "react-icons/io5";
import { useHistory } from "react-router";
import BorderButton from "../border-button/border-button.component";
import ProfileSettingsModal from "../profile-settings-modal/profile-settings-modal.component";

const ProfileParams = () => {
  const {
    isOpen: isProfileSettingsModalOpen,
    onOpen: onProfileSettingsModalOpen,
    onClose: onProfileSettingsModalClose,
  } = useDisclosure();
  const history = useHistory();
  return (
    <Flex align="center">
      <ProfileSettingsModal
        isOpen={isProfileSettingsModalOpen}
        onClose={onProfileSettingsModalClose}
      />
      <BorderButton onClick={() => history.push("/accounts/edit/")}>
        Edit Profile
      </BorderButton>
      <Icon
        as={IoSettingsOutline}
        ml="1rem"
        w={6}
        h={6}
        cursor="pointer"
        onClick={onProfileSettingsModalOpen}
      />
    </Flex>
  );
};

export default ProfileParams;
