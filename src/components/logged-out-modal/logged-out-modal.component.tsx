import { Box, Divider, Text } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/user/user.slice";
import ModalItem from "../modal-item/modal-item.component";

interface LoggedOutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoggedOutModal = ({ isOpen, onClose }: LoggedOutModalProps) => {
  const dispatch = useAppDispatch();
  const logInHandler = () => {
    onClose();
    dispatch(logOut());
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent overflow="hidden" borderRadius="5px" maxW="25rem">
        <ModalBody p={0}>
          <Box p="1rem">
            <Text fontSize="lg" fontWeight="600" textAlign="center">
              Logging Out
            </Text>
            <Text fontSize="sm" color="#a2a2a2" textAlign="center" mt="0.3rem">
              You need to log back in.
            </Text>
          </Box>
          <Divider />
          <Link to="/">
            <ModalItem onClick={logInHandler}>
              <Text textAlign="center" userSelect="none" fontSize="sm">
                Log In
              </Text>
            </ModalItem>
          </Link>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoggedOutModal;
