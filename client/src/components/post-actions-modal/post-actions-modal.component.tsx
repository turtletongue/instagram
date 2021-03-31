import { useClipboard, useDisclosure } from "@chakra-ui/hooks";
import { Divider, Text } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import { IUser } from "../../redux/user/user.slice";
import ModalItem from "../modal-item/modal-item.component";
import UnfollowModal from "../unfollow-modal/unfollow-modal.component";

interface PostActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  headerOptions?: boolean;
  postId: number;
  author?: IUser;
}

const PostActionsModal = ({
  isOpen,
  onClose,
  headerOptions,
  postId,
  author,
}: PostActionsModalProps) => {
  const { onCopy } = useClipboard(`http://localhost:3000/p/${postId}`);
  const toast = useToast();
  const copyLinkHandler = () => {
    onCopy();
    toast({
      title: "Copied to clipboard!",
      status: "success",
    });
    onClose();
  };
  const {
    isOpen: isUnfollowModalOpen,
    onOpen: onUnfollowModalOpen,
    onClose: onUnfollowModalClose,
  } = useDisclosure();
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      {author ? (
        <UnfollowModal
          isOpen={isUnfollowModalOpen}
          onClose={onUnfollowModalClose}
          user={author}
        />
      ) : (
        <></>
      )}
      <ModalOverlay />
      <ModalContent overflow="hidden" borderRadius="5px" maxW="25rem">
        <ModalBody p={0}>
          {headerOptions ? (
            <>
              <ModalItem onClick={onUnfollowModalOpen}>
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
            </>
          ) : (
            <></>
          )}
          <ModalItem onClick={copyLinkHandler}>
            <Text textAlign="center" userSelect="none" fontSize="sm">
              Copy Link
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

export default PostActionsModal;
