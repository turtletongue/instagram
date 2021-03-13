import Icon from "@chakra-ui/icon";
import { Flex, Spacer } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleCommentLike } from "../../redux/posts/posts.actions";
import { IComment } from "../../redux/posts/posts.interfaces";
import EmojiText from "../emoji-text/emoji-text.component";
import MotionBox from "../motion-box/motion-box.component";

interface CommentProps {
  comment: IComment;
  full?: boolean;
  [propName: string]: any;
}

const Comment = ({ comment, full, ...otherProps }: CommentProps) => {
  const dispatch = useDispatch();
  const isLiked: boolean = comment.isLiked;
  const postId: string = comment.postId;
  const commentLikeHandler = (comment: IComment) => {
    if (comment.id) {
      dispatch(toggleCommentLike(postId, comment.id));
    }
  };
  return (
    <Flex display="inline-flex" w={full ? "16rem" : "100%"}>
      <EmojiText fontSize="sm" maxW="30rem" overflow="hidden" {...otherProps}>
        <chakra.span
          as={Link}
          to={`/${comment.author.id}/`}
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
          {comment.author.id}
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
