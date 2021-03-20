import Icon from "@chakra-ui/icon";
import { Flex, Spacer } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { POST_PAGE, USER_PAGE } from "../../constants";
import {
  IComment,
  likeComment,
  unlikeComment,
} from "../../redux/feed/feed.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  likePostPageComment,
  unlikePostPageComment,
} from "../../redux/post-page/post-page.slice";
import { RootState } from "../../redux/store";
import {
  likeUserPageComment,
  unlikeUserPageComment,
} from "../../redux/user-page/user-page.slice";
import { IUser } from "../../redux/user/user.slice";
import EmojiText from "../emoji-text/emoji-text.component";
import MotionBox from "../motion-box/motion-box.component";

interface CommentProps {
  comment: IComment;
  full?: boolean;
  page?: string;
  [propName: string]: any;
}

const Comment = ({ comment, full, page, ...otherProps }: CommentProps) => {
  const dispatch = useAppDispatch();
  const isLiked: boolean = comment.isLiked;
  const postId: number = comment.postId;
  const user: IUser | null = useAppSelector(
    (state: RootState) => state.user.currentUser
  );
  const commentLikeHandler = (comment: IComment) => {
    if (comment.id && user) {
      const commentLike = {
        postId,
        commentId: comment.id,
        likerId: user.userId,
      };
      switch (page) {
        case USER_PAGE:
          dispatch(
            isLiked
              ? unlikeUserPageComment(commentLike)
              : likeUserPageComment(commentLike)
          );
          break;
        case POST_PAGE:
          dispatch(
            isLiked
              ? unlikePostPageComment(comment.id)
              : likePostPageComment(comment.id)
          );
          break;
        default:
          dispatch(
            isLiked ? unlikeComment(commentLike) : likeComment(commentLike)
          );
          break;
      }
    }
  };
  return (
    <Flex display="inline-flex" w={full ? "16rem" : "100%"}>
      <EmojiText fontSize="sm" maxW="30rem" overflow="hidden" {...otherProps}>
        <chakra.span
          as={Link}
          to={`/${comment.authorId}/`}
          fontSize="sm"
          fontWeight="500"
          color="#2a2a2a"
          mr="0.3rem"
          sx={{
            "&:hover": {
              textDecoration: "underline",
            },
            "&:active": {
              opacity: 0.6,
            },
          }}
        >
          {comment.authorId}
        </chakra.span>
        {comment.content}
      </EmojiText>
      <Spacer />
      <MotionBox
        w={7}
        h={7}
        whileTap={{ scale: 1.2 }}
        position="relative"
        right={full ? "0" : "-0.5rem"}
      >
        <Icon
          as={isLiked ? AiFillHeart : AiOutlineHeart}
          color={isLiked ? "red.500" : ""}
          w={3}
          h={3}
          cursor="pointer"
          onClick={() => commentLikeHandler(comment)}
        />
      </MotionBox>
    </Flex>
  );
};

export default Comment;
