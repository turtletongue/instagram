import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { IUser } from "../../redux/user/user.slice";
import ControlFollowingButton from "../control-following-button/control-following-button.component";
import FollowersModal from "../followers-modal/followers-modal.component";
import FollowingModal from "../following-modal/following-modal.component";
import ProfileParams from "../profile-params/profile-params.component";

interface ProfileDataProps {
  user: IUser;
  postsCount: number;
}

const ProfileData = ({ user, postsCount }: ProfileDataProps) => {
  const {
    isOpen: isFollowersModalOpen,
    onOpen: onFollowersModalOpen,
    onClose: onFollowersModalClose,
  } = useDisclosure();
  const {
    isOpen: isFollowingModalOpen,
    onOpen: onFollowingModalOpen,
    onClose: onFollowingModalClose,
  } = useDisclosure();
  const currentUser: IUser | null = useAppSelector(
    (state: RootState) => state.user.currentUser
  );
  let isPageOfLoggedUser: boolean = false;
  let isFollowed: boolean = false;
  if (currentUser) {
    isPageOfLoggedUser = currentUser.id === user.id;
    isFollowed = currentUser?.following
      ? currentUser.following.findIndex(
          (followingUser: IUser) => followingUser.id === user.id
        ) !== -1
      : false;
  }
  return (
    <Box>
      <FollowersModal
        isOpen={isFollowersModalOpen}
        onClose={onFollowersModalClose}
        user={user}
      />
      <FollowingModal
        isOpen={isFollowingModalOpen}
        onClose={onFollowingModalClose}
        user={user}
        isOtherUserFollowing={!isPageOfLoggedUser}
      />
      <Flex align="center">
        <Text fontSize="3xl" fontWeight="200">
          {user.username}
        </Text>
        {isPageOfLoggedUser ? (
          <ProfileParams />
        ) : (
          <ControlFollowingButton isFollowed={isFollowed} user={user} />
        )}
      </Flex>
      <Flex w="19rem" mt="1rem">
        <Box userSelect="none">
          <Text d="inline" fontWeight="500">
            {postsCount}
          </Text>{" "}
          post{postsCount === 1 ? "" : "s"}
        </Box>
        <Spacer />
        <Box
          cursor="pointer"
          onClick={onFollowersModalOpen}
          userSelect="none"
          sx={{ "&:active": { opacity: 0.6 } }}
        >
          <Text d="inline" fontWeight="500">
            {user.followers ? user.followers.length : 0}
          </Text>{" "}
          followers
        </Box>
        <Spacer />
        <Box
          cursor="pointer"
          onClick={onFollowingModalOpen}
          userSelect="none"
          sx={{ "&:active": { opacity: 0.6 } }}
        >
          <Text d="inline" fontWeight="500">
            {user.following ? user.following.length : 0}
          </Text>{" "}
          following
        </Box>
      </Flex>
      <Box mt="1rem">
        <Text fontWeight="500">{user.name}</Text>
        <Text>{user.bio}</Text>
      </Box>
    </Box>
  );
};

export default ProfileData;
