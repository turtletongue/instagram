import Icon from "@chakra-ui/icon";
import { Flex, Spacer, Text } from "@chakra-ui/layout";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { IPost } from "../../redux/feed/feed.slice";

interface MinPostDataProps {
  post: IPost;
}

const MinPostData = ({ post }: MinPostDataProps) => {
  return (
    <Flex
      cursor="pointer"
      zIndex="2"
      position="absolute"
      w="7rem"
      h="4rem"
      m="auto"
      top={0}
      bottom={0}
      left={0}
      right={0}
      align="center"
      justify="center"
    >
      <Flex align="center">
        <Icon as={AiFillHeart} w={4} h={4} color="white" />
        <Text fontWeight="500" color="white" ml="0.3rem">
          {post.likesCount}
        </Text>
      </Flex>
      <Spacer />
      <Flex align="center">
        <Icon as={FaComment} w={4} h={4} color="white" />
        <Text fontWeight="500" color="white" ml="0.3rem">
          {post.comments.length}
        </Text>
      </Flex>
    </Flex>
  );
};

export default MinPostData;
