import { Box, Flex, Text } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { IUser } from "../../redux/user/user.slice";
import Avatar from "../avatar/avatar.component";

interface ShrimpUserProps {
  user: IUser;
}

const ShrimpUser = ({ user }: ShrimpUserProps) => {
  return (
    <Flex align="center" mt="1rem">
      <Link to={`/${user.username}`}>
        <Avatar src={user.avatarUrl} h="1.8rem" w="1.8rem" />
      </Link>
      <Box ml="0.7rem">
        <Link to={`/${user.username}`}>
          <Text
            fontSize="sm"
            fontWeight="500"
            color="#2a2a2a"
            sx={{
              "&:hover": {
                textDecoration: "underline",
              },
              "&:active": {
                opacity: 0.6,
              },
            }}
          >
            {user.username}
          </Text>
        </Link>
        {user.name ? (
          <Text fontSize="sm" color="#a2a2a2">
            {user.name}
          </Text>
        ) : (
          <></>
        )}
      </Box>
    </Flex>
  );
};

export default ShrimpUser;
