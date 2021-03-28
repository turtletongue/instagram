import { Flex, Icon, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IUser } from "../../redux/user/user.slice";
import Avatar from "../avatar/avatar.component";
import PostActionsModal from "../post-actions-modal/post-actions-modal.component";

interface PostHeaderProps {
  author: IUser;
  postId: number;
  [propName: string]: any;
}

const PostHeader = ({ author, postId, ...otherProps }: PostHeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      h="3.5rem"
      w="100%"
      bgColor="white"
      align="center"
      p="1rem"
      borderBottomWidth={1}
      borderBottomColor="#efefef"
      {...otherProps}
    >
      <PostActionsModal
        isOpen={isOpen}
        onClose={onClose}
        postId={postId}
        headerOptions
      />
      <Flex align="center">
        <Link to={`/${author.username}/`}>
          <Avatar src={author.avatarUrl} w="2rem" h="2rem" />
        </Link>
        <Link to={`/${author.username}/`}>
          <Text
            ml="0.8rem"
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
            {author.username}
          </Text>
        </Link>
      </Flex>
      <Spacer />
      <Icon
        as={BsThreeDots}
        w={4}
        h={4}
        color="#2a2a2a"
        cursor="pointer"
        onClick={onOpen}
      />
    </Flex>
  );
};

export default PostHeader;
