import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import { IUser } from "../../redux/users/users.interfaces";
import ControlFollowingButton from "../control-following-button/control-following-button.component";
import ProfileParams from "../profile-params/profile-params.component";

interface ProfileDataProps {
  user: IUser;
}

const ProfileData = ({ user }: ProfileDataProps) => {
  const currentUserId: string | undefined = "1";
  return (
    <Box>
      <Flex align="center">
        <Text fontSize="3xl" fontWeight="200">
          {user.id}
        </Text>
        {currentUserId === user.id ? (
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
