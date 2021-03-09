import { Box, Flex, Text } from "@chakra-ui/layout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { State } from "../../redux/store";
import Avatar from "../avatar/avatar.component";

const CurrentUser = () => {
  const user = useSelector((state: State) => state.signIn.user);
  return (
    <Box position="fixed" mt="6rem" left="52rem">
      <Flex align="center">
        <Link to={`/${user?.id}/`}>
          <Avatar src={user?.avatar ? user.avatar : ""} w="3.5rem" h="3.5rem" />
        </Link>
        <Flex direction="column" ml="1rem">
          <Link to={`/${user?.id}/`}>
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
              {user?.id}
            </Text>
          </Link>
          <Text color="#929292" fontSize="sm">
            {user?.fullname}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CurrentUser;
