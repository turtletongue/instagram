import { Box, Flex, Text } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { IUser } from "../../redux/user/user.slice";
import Avatar from "../avatar/avatar.component";

const CurrentUser = () => {
  const user: IUser | null = useAppSelector(
    (state: RootState) => state.user.currentUser
  );
  return (
    <Box position="fixed" mt="6rem" left="52rem">
      {user ? (
        <Flex align="center">
          <Link to={`/${user.username}/`}>
            <Avatar src={user.avatarUrl} w="3.5rem" h="3.5rem" />
          </Link>
          <Flex direction="column" ml="1rem">
            <Link to={`/${user.username}/`}>
              <Text
                fontSize="sm"
                fontWeight="500"
                color="#2a2a2a"
                sx={{
                  "&:active": {
                    opacity: 0.6,
                  },
                }}
              >
                {user.username}
              </Text>
            </Link>
            <Text color="#929292" fontSize="sm">
              {user.name ? user.name : ""}
            </Text>
          </Flex>
        </Flex>
      ) : (
        <Text>Login into account.</Text>
      )}
    </Box>
  );
};

export default CurrentUser;
