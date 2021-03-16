import { Box, Flex, Icon, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { IPost } from "../../redux/feed/feed.slice";
import MotionBox from "../motion-box/motion-box.component";
import PostActionsModal from "../post-actions-modal/post-actions-modal.component";
import PostPageModal from "../post-page-modal/post-page-modal.component";

interface PostActionsProps {
  post: IPost;
  inputRef: any;
  isPostPageOpen: boolean;
  onPostPageOpen: () => void;
  onPostPageClose: () => void;
  full?: boolean;
}

const PostActions = ({
  post,
  inputRef,
  isPostPageOpen,
  onPostPageOpen,
  onPostPageClose,
  full,
}: PostActionsProps) => {
  const dispatch = useDispatch();
  const {
    isOpen: isActionsOpen,
    onOpen: onActionsOpen,
    onClose: onActionsClose,
  } = useDisclosure();
  const isLiked: boolean | undefined = false;
  const isBookmarked: boolean | undefined = false;
  const likeHandler = () => {
    // dispatch(setIsLiked(post.id, !isLiked));
  };
  const toggleBookmarkHandler = () => {
    // dispatch(setIsBookmarked(post.id, !isBookmarked));
  };
  const toggleInputFocusHandler = () => {
    if (inputRef.current) inputRef.current.focus();
  };
  return (
    <Box mb="0.5rem">
      <PostActionsModal
        isOpen={isActionsOpen}
        onClose={onActionsClose}
        postId={post.id}
      />
      <PostPageModal
        isOpen={isPostPageOpen}
        onClose={onPostPageClose}
        post={post}
      />
      <Flex align="center">
        <Flex align="center" w="7rem">
          <MotionBox w={7} h={7} whileTap={{ scale: 1.2 }}>
            <Icon
              as={isLiked ? AiFillHeart : AiOutlineHeart}
              color={isLiked ? "red.500" : ""}
              w="100%"
              h="100%"
              cursor="pointer"
              onClick={likeHandler}
            />
          </MotionBox>
          <Spacer />
          <Icon
            as={FaRegComment}
            w={6}
            h={6}
            cursor="pointer"
            onClick={full ? toggleInputFocusHandler : onPostPageOpen}
          />
          <Spacer />
          <Icon
            as={IoPaperPlaneOutline}
            w={7}
            h={7}
            cursor="pointer"
            onClick={onActionsOpen}
          />
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
        {`${post.likesCount.toLocaleString("en")} like${
          post.likesCount > 1 ? "s" : ""
        }`}
      </Text>
    </Box>
  );
};

export default PostActions;
