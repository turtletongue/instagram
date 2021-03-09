import Icon from "@chakra-ui/icon";
import { Flex, Spacer, Text } from "@chakra-ui/layout";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleCommentLike } from "../../redux/posts/posts.actions";
import { IComment } from "../../redux/posts/posts.interfaces";
import EmojiText from "../emoji-text/emoji-text.component";
import MotionBox from "../motion-box/motion-box.component";

interface CommentProps {
  postId: string;
  isLiked: boolean;
  comment: IComment;
}

const Comment = ({ postId, isLiked, comment }: CommentProps) => {
  const dispatch = useDispatch();
  const commentLikeHandler = (comment: IComment) => {
    if (comment.id) {
      dispatch(toggleCommentLike(postId, comment.id));
    }
  };
  return (
    <Flex align="center">
      <Link to={`/${comment.authorId}/`}>
        <Text
          display="inline"
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
          {comment.authorId}
        </Text>
      </Link>
      <EmojiText ml="0.3rem" fontSize="sm" maxW="30rem" overflow="hidden">
        {comment.content}
      </EmojiText>
      <Spacer />
      <MotionBox
        w={7}
        h={7}
        whileTap={{ scale: 1.2 }}
        position="relative"
        right="-0.5rem"
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
