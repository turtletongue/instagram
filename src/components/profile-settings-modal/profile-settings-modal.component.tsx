import { useDisclosure } from "@chakra-ui/hooks";
import { Divider, Text } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/user/user.slice";
import LoggedOutModal from "../logged-out-modal/logged-out-modal.component";
import ModalItem from "../modal-item/modal-item.component";

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSettingsModal = ({
  isOpen,
  onClose,
}: ProfileSettingsModalProps) => {
  const dispatch = useAppDispatch();
  const {
    isOpen: isLoggedOutModalOpen,
    onOpen: onLoggedOutModalOpen,
    onClose: onLoggedOutModalClose,
  } = useDisclosure();
  const logOutHandler = () => {
    onLoggedOutModalOpen();
    setTimeout(() => {
      onLoggedOutModalClose();
      dispatch(logOut());
    }, 2000);
  };
  return (
    <>
      <LoggedOutModal
        isOpen={isLoggedOutModalOpen}
        onClose={onLoggedOutModalClose}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent overflow="hidden" borderRadius="5px" maxW="25rem">
          <ModalBody p={0}>
            <ModalItem onClick={logOutHandler}>
              <Text textAlign="center" userSelect="none" fontSize="sm">
                Log Out
              </Text>
            </ModalItem>
            <Divider />
            <ModalItem onClick={onClose}>
              <Text textAlign="center" userSelect="none" fontSize="sm">
                Cancel
              </Text>
            </ModalItem>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileSettingsModal;
