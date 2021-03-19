import Icon from "@chakra-ui/icon";
import { Flex, Spacer } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  IComment,
  likeComment,
  unlikeComment,
} from "../../redux/feed/feed.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
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
  userPage?: boolean;
  [propName: string]: any;
}

const Comment = ({ comment, full, userPage, ...otherProps }: CommentProps) => {
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
      dispatch(
        userPage
          ? isLiked
            ? unlikeUserPageComment(commentLike)
            : likeUserPageComment(commentLike)
          : isLiked
          ? unlikeComment(commentLike)
          : likeComment(commentLike)
      );
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
