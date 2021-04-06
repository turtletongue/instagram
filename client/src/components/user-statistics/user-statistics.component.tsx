import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { IUser } from "../../redux/user/user.slice";

interface UserStatisticsProps {
  postsCount: number;
  user: IUser;
  onFollowersModalOpen: () => void;
  onFollowingModalOpen: () => void;
}

const UserStatistics = ({
  postsCount,
  user,
  onFollowersModalOpen,
  onFollowingModalOpen,
}: UserStatisticsProps) => {
  const [isLessThan820] = useMediaQuery("(max-width: 820px)");
  return (
    <Flex
      w={isLessThan820 ? "100%" : "19rem"}
      mt="1rem"
      p={isLessThan820 ? "0 1rem" : 0}
    >
      <Box userSelect="none">
        <Text d="inline" fontWeight="500">
          {postsCount >= 1000
            ? `${Math.floor(postsCount / 1000)}k`
            : postsCount}
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
          {user.followers
            ? user.followers.length >= 1000
              ? `${Math.floor(user.followers.length / 1000)}k`
              : user.followers.length
            : 0}
        </Text>{" "}
        follower{user.followers?.length === 1 ? "" : "s"}
      </Box>
      <Spacer />
      <Box
        cursor="pointer"
        onClick={onFollowingModalOpen}
        userSelect="none"
        sx={{ "&:active": { opacity: 0.6 } }}
      >
        <Text d="inline" fontWeight="500">
          {user.following
            ? user.following.length >= 1000
              ? `${Math.floor(user.following.length / 1000)}k`
              : user.following.length
            : 0}
        </Text>{" "}
        following
      </Box>
    </Flex>
  );
};

export default UserStatistics;
