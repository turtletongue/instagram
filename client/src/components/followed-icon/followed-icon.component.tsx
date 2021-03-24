import Icon from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/layout";
import { AiOutlineCheck } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";

const FollowedIcon = () => {
  return (
    <Flex>
      <Icon as={FaUserAlt} w={3} h={3} />
      <Icon as={AiOutlineCheck} w={3} h={3} ml="0.3rem" />
    </Flex>
  );
};

export default FollowedIcon;
