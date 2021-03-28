import { Divider, Flex, Text } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { IUser } from "../../redux/user/user.slice";
import Avatar from "../avatar/avatar.component";
import ModalItem from "../modal-item/modal-item.component";

interface UnfollowModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser;
}

const UnfollowModal = ({ isOpen, onClose, user }: UnfollowModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p="0">
        <ModalBody>
          <Flex justify="center" m="2rem 0">
            <Avatar src={user.avatarUrl} w="5rem" h="5rem" />
          </Flex>
          <Text textAlign="center" fontSize="sm" mb="1rem">
            Unfollow @{user.username}?
          </Text>
          <Divider />
          <ModalItem>
            <Text
              textAlign="center"
              userSelect="none"
              fontSize="sm"
              color="red.500"
              fontWeight="700"
            >
              Unfollow
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
  );
};

export default UnfollowModal;
