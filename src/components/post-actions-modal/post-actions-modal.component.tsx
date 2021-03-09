import { useClipboard } from "@chakra-ui/hooks";
import { Divider, Text } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import ModalItem from "../modal-item/modal-item.component";

interface PostActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  headerOptions?: boolean;
  postId: string;
}

const PostActionsModal = ({
  isOpen,
  onClose,
  headerOptions,
  postId,
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
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent overflow="hidden" borderRadius="5px" maxW="25rem">
        <ModalBody p={0}>
          {headerOptions ? (
            <>
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
