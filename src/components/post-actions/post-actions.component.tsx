import { Box, Flex, Icon, Spacer, Text } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setIsBookmarked, setIsLiked } from "../../redux/posts/posts.actions";
import { IPost } from "../../redux/posts/posts.interfaces";
import { State } from "../../redux/store";
import MotionBox from "../motion-box/motion-box.component";

interface PostActionsProps {
  post: IPost;
}

const PostActions = ({ post }: PostActionsProps) => {
  const dispatch = useDispatch();
  const isLiked: boolean | undefined = useSelector(
    (state: State) =>
      state.posts.postsData.find((p: IPost) => {
        return post.id === p.id;
      })?.isLiked
  );
  const isBookmarked: boolean | undefined = useSelector(
    (state: State) =>
      state.posts.postsData.find((p: IPost) => {
        return post.id === p.id;
      })?.isBookmarked
  );
  const likeHandler = () => {
    dispatch(setIsLiked(post.id, !isLiked));
  };
  const toggleBookmarkHandler = () => {
    dispatch(setIsBookmarked(post.id, !isBookmarked));
  };
  return (
    <Box mb="0.5rem">
      <Flex align="center">
        <Flex align="center" w="7rem">
          <MotionBox w={7} h={7} whileTap={{ scale: 1.2 }}>
            <Icon
              as={isLiked ? AiFillHeart : AiOutlineHeart}
              color={isLiked ? "red.500" : ""}
              w="100%"
              h="100%"
              cursor="pointer"
              onClick={() => likeHandler()}
            />
          </MotionBox>
          <Spacer />
          <Icon as={FaRegComment} w={6} h={6} cursor="pointer" />
          <Spacer />
          <Icon as={IoPaperPlaneOutline} w={7} h={7} cursor="pointer" />
        </Flex>
        <Spacer />
        <Icon
          onClick={toggleBookmarkHandler}
          as={isBookmarked ? RiBookmarkFill : RiBookmarkLine}
          w={7}
          h={7}
          cursor="pointer"
        />
      </Flex>
      <Text
        userSelect="none"
        mt="0.5rem"
        fontWeight="600"
        fontSize="sm"
        color="#2a2a2a"
      >
        {`${post.likes.toLocaleString("en")} like${post.likes > 1 ? "s" : ""}`}
      </Text>
    </Box>
  );
};

export default PostActions;
