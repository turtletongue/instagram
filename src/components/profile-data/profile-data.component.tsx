import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { IUser } from "../../redux/user/user.slice";
import ControlFollowingButton from "../control-following-button/control-following-button.component";
import ProfileParams from "../profile-params/profile-params.component";

interface ProfileDataProps {
  user: IUser;
}

const ProfileData = ({ user }: ProfileDataProps) => {
  const currentUserId: string | undefined = useAppSelector(
    (state: RootState) => state.user.currentUser?.userId
  );
  return (
    <Box>
      <Flex align="center">
        <Text fontSize="3xl" fontWeight="200">
          {user.userId}
        </Text>
        {currentUserId === user.userId ? (
          <ProfileParams />
        ) : (
          <ControlFollowingButton isFollowed={false} />
        )}
      </Flex>
      <Flex w="19rem" mt="1rem">
        <Box>
          <Text d="inline" fontWeight="500">
            0
          </Text>{" "}
          posts
        </Box>
        <Spacer />
        <Box cursor="pointer">
          <Text d="inline" fontWeight="500">
            25
          </Text>{" "}
          followers
        </Box>
        <Spacer />
        <Box cursor="pointer">
          <Text d="inline" fontWeight="500">
            64
          </Text>{" "}
          following
        </Box>
      </Flex>
      <Box mt="1rem">
        <Text fontWeight="500">{user.fullname}</Text>
        <Text>{user.description}</Text>
      </Box>
    </Box>
  );
};

export default ProfileData;
