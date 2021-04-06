import { Input } from "@chakra-ui/input";
import { Box, Divider, Text } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { Ref, useRef } from "react";
import { useAppDispatch } from "../../redux/hooks";
import {
  removeCurrentPhoto,
  uploadPhoto,
} from "../../redux/profile-edit-page/profile-edit-page.slice";
import ModalItem from "../modal-item/modal-item.component";

interface ChangePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePhotoModal = ({ isOpen, onClose }: ChangePhotoModalProps) => {
  const dispatch = useAppDispatch();
  const inputRef: Ref<HTMLInputElement> = useRef(null);
  const changeAvatarHandler = (file: any) => {
    dispatch(uploadPhoto({ fileData: file }));
    onClose();
  };
  const token: string | null = localStorage.getItem("authToken");
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent overflow="hidden" borderRadius="0.8rem" maxW="25rem">
        <ModalBody p={0}>
          <Box p="1.5rem">
            <Text
              fontSize="lg"
              color="#585858"
              fontWeight="600"
              textAlign="center"
            >
              Change Profile Photo
            </Text>
          </Box>
          <Divider />
          <ModalItem
            position="relative"
            onClick={() => inputRef.current?.click()}
          >
            <Input
              d="none"
              type="file"
              ref={inputRef}
              onChange={(event: { target: HTMLInputElement }) => {
                if (event.target.files)
                  changeAvatarHandler(event.target.files[0]);
              }}
            />
            <Text
              textAlign="center"
              userSelect="none"
              fontSize="sm"
              fontWeight="700"
              color="#0095f6"
            >
              Upload Photo
            </Text>
          </ModalItem>
          <Divider />
          <ModalItem
            onClick={() => {
              if (token) {
                dispatch(removeCurrentPhoto({ token }));
              }
              onClose();
            }}
          >
            <Text
              textAlign="center"
              userSelect="none"
              fontSize="sm"
              fontWeight="700"
              color="#ed4956"
            >
              Remove Current Photo
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

export default ChangePhotoModal;
