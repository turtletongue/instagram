import { Box, Text } from "@chakra-ui/react";
import { IComment } from "../../redux/posts/posts.interfaces";
import findTimeDifference from "../../utils/findTimeDifference.util";
import Comment from "../comment/comment.component";

interface PostCommentsProps {
  postId: string;
  postDate: Date;
  comments: IComment[];
}

const PostComments = ({ postId, postDate, comments }: PostCommentsProps) => {
  const timeAgo: string = findTimeDifference(postDate);
  return (
    <>
      <Box>
        {comments.map((comment) => {
          const isLiked: boolean = comment.isLiked;
          return (
            <Comment
              key={comment.id}
              postId={postId}
              isLiked={isLiked}
              comment={comment}
            />
          );
        })}
        <Text
          fontWeight="400"
          color="#adadad"
          fontSize="0.6rem"
          mt="0.3rem"
          userSelect="none"
        >
          {timeAgo}
        </Text>
      </Box>
    </>
  );
};

export default PostComments;
