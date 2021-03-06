import { Box, Flex, Spacer, Icon, Text } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { VscBookmark } from 'react-icons/vsc';
import { useDispatch, useSelector } from "react-redux";
import { setIsLiked } from "../../redux/posts/posts.actions";
import { IPost } from "../../redux/posts/posts.interfaces";
import { State } from "../../redux/store";

interface PostActionsProps {
  post: IPost
}

const PostActions = ({ post }: PostActionsProps) => {
  const dispatch = useDispatch();
  const isLiked: boolean | undefined = useSelector(
    (state: State) => state.posts.postsData.find((p: IPost) => {
      return post.id === p.id; 
    })?.isLiked);
  return (
    <Box mb="0.5rem">
      <Flex align="center">
        <Flex
          align="center"
          w="7rem"
        >
          <Icon
            as={isLiked ? AiFillHeart : AiOutlineHeart}
            color={isLiked ? "red.500" : ""}
            w={7}
            h={7}
            cursor="pointer"
            onClick={() => dispatch(setIsLiked(post.id, !isLiked))}
          />
          <Spacer />
          <Icon
            as={FaRegComment}
            w={6}
            h={6}
            cursor="pointer"
          />
          <Spacer />
          <Icon
            as={IoPaperPlaneOutline}
            w={7}
            h={7}
            cursor="pointer"
          />
        </Flex>
        <Spacer />
        <Icon
          as={VscBookmark}
          w={7}
          h={7}
          cursor="pointer"
        />
      </Flex>
      <Text
        mt="0.5rem"
        fontWeight="600"
        fontSize="sm"
        color="#2a2a2a"
      >
        { `${post.likes.toLocaleString("en")} like${post.likes > 1 ? 's' : '' }` }
      </Text>
    </Box>
  );
}

export default PostActions;