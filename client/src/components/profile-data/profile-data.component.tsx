import { Box, Flex, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { IUser } from "../../redux/user/user.slice";
import ControlFollowingButton from "../control-following-button/control-following-button.component";
import ProfileParams from "../profile-params/profile-params.component";
import UserStatistics from "../user-statistics/user-statistics.component";

interface ProfileDataProps {
  user: IUser;
  postsCount: number;
  isItPageOfLoggedUser: boolean;
  isFollowed: boolean;
  onFollowersModalOpen: () => void;
  onFollowingModalOpen: () => void;
  [propName: string]: any;
}

const ProfileData = ({
  user,
  postsCount,
  isItPageOfLoggedUser,
  isFollowed,
  onFollowersModalOpen,
  onFollowingModalOpen,
  ...otherProps
}: ProfileDataProps) => {
  const [isLessThan820] = useMediaQuery("(max-width: 820px)");
  return (
    <Box {...otherProps}>
      <Flex
        align={isLessThan820 ? "" : "center"}
        direction={isLessThan820 ? "column" : "row"}
      >
        <Text fontSize="3xl" fontWeight="200">
          {user.username}
        </Text>
        {isItPageOfLoggedUser ? (
          <ProfileParams ml={isLessThan820 ? 0 : "1rem"} />
        ) : (
          <ControlFollowingButton
            isFollowed={isFollowed}
            user={user}
            ml={isLessThan820 ? 0 : "1rem"}
            maxW="7rem"
          />
        )}
      </Flex>
      {!isLessThan820 ? (
        <UserStatistics
          postsCount={postsCount}
          user={user}
          onFollowersModalOpen={onFollowersModalOpen}
          onFollowingModalOpen={onFollowingModalOpen}
        />
      ) : (
        <></>
      )}
      <Box mt="1rem">
        <Text fontWeight="500">{user.name}</Text>
        <Text>{user.bio}</Text>
      </Box>
    </Box>
  );
};

export default ProfileData;
