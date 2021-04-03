import { Box, Flex, Icon, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { POST_PAGE, USER_PAGE } from "../../constants";
import {
  bookmarkPost,
  IPost,
  likePost,
  unbookmarkPost,
  unlikePost,
} from "../../redux/feed/feed.slice";
import { useAppDispatch } from "../../redux/hooks";
import {
  bookmarkPostPagePost,
  likePostPagePost,
  unbookmarkPostPagePost,
  unlikePostPagePost,
} from "../../redux/post-page/post-page.slice";
import {
  bookmarkUserPagePost,
  likeUserPagePost,
  unbookmarkUserPagePost,
  unlikeUserPagePost,
} from "../../redux/user-page/user-page.slice";
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
  page?: string;
  onMainPageModalClose?: () => void;
}

const PostActions = ({
  post,
  inputRef,
  isPostPageOpen,
  onPostPageOpen,
  onPostPageClose,
  full,
  page,
}: PostActionsProps) => {
  const dispatch = useAppDispatch();
  const {
    isOpen: isActionsOpen,
    onOpen: onActionsOpen,
    onClose: onActionsClose,
  } = useDisclosure();
  const isLiked: boolean = post.isLiked;
  const isBookmarked: boolean = post.isBookmarked;
  const token: string | null = localStorage.getItem("authToken");
  const likeHandler = () => {
    switch (page) {
      case USER_PAGE:
        if (token) {
          if (isLiked)
            dispatch(unlikeUserPagePost({ postId: Number(post.id), token }));
          else dispatch(likeUserPagePost({ postId: Number(post.id), token }));
        }
        break;
      case POST_PAGE:
        if (token) {
          if (isLiked)
            dispatch(unlikePostPagePost({ postId: Number(post.id), token }));
          else dispatch(likePostPagePost({ postId: Number(post.id), token }));
        }
        break;
      default:
        if (token) {
          if (isLiked) dispatch(unlikePost({ postId: Number(post.id), token }));
          else dispatch(likePost({ postId: Number(post.id), token }));
        }
        break;
    }
  };
  const toggleBookmarkHandler = () => {
    switch (page) {
      case USER_PAGE:
        if (token) {
          if (isBookmarked)
            dispatch(
              unbookmarkUserPagePost({ postId: Number(post.id), token })
            );
          else
            dispatch(bookmarkUserPagePost({ postId: Number(post.id), token }));
        }
        break;
      case POST_PAGE:
        if (token) {
          if (isBookmarked)
            dispatch(
              unbookmarkPostPagePost({ postId: Number(post.id), token })
            );
          else
            dispatch(bookmarkPostPagePost({ postId: Number(post.id), token }));
        }
        break;
      default:
        if (token) {
          if (isBookmarked)
            dispatch(unbookmarkPost({ postId: Number(post.id), token }));
          else dispatch(bookmarkPost({ postId: Number(post.id), token }));
        }
        break;
    }
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
