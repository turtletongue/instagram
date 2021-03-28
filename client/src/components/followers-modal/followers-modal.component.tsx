import { Flex, Spacer, Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { IUser } from "../../redux/user/user.slice";
import ControlFollowingButton from "../control-following-button/control-following-button.component";
import ShrimpUser from "../shrimp-user/shrimp-user.component";

interface FollowersModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser;
}

const FollowersModal = ({ isOpen, onClose, user }: FollowersModalProps) => {
  const currentLoggedUser: IUser | null = useAppSelector(
    (state: RootState) => state.user.currentUser
  );
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p="0" minH="10rem" maxH="25rem" overflow="hidden">
        <ModalHeader p="0">
          <Text
            fontWeight="500"
            fontSize="md"
            textAlign="center"
            borderBottomWidth="1px"
            p="0.5rem 0"
          >
            Followers
          </Text>
        </ModalHeader>
        <ModalCloseButton
          sx={{
            "&:active, &:focus": { boxShadow: "none" },
            "&:hover": { bgColor: "white" },
          }}
        />
        <ModalBody pt="0" overflowY="scroll">
          {user.followers ? (
            user.followers.map((follower: IUser, index: number) => {
              const isFollowed: boolean = currentLoggedUser?.following
                ? currentLoggedUser.following
                    .map((f: IUser) => f.id)
                    .includes(follower.id)
                : false;
              return (
                <Flex align="center" key={index}>
                  <ShrimpUser user={follower} />
                  <Spacer />
                  <ControlFollowingButton isFollowed={isFollowed} user={user} />
                </Flex>
              );
            })
          ) : (
            <></>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FollowersModal;
