import { Box } from "@chakra-ui/react";
import { IComment } from "../../redux/posts/posts.interfaces";
import findTimeDifference from "../../utils/findTimeDifference.util";
import Comment from "../comment/comment.component";
import Time from "../time/time.component";

interface PostCommentsProps {
  postDate: Date;
  comments: IComment[];
}

const PostComments = ({ postDate, comments }: PostCommentsProps) => {
  const timeAgo: string = findTimeDifference(postDate);
  return (
    <>
      <Box>
        {comments.map((comment: IComment, index: number) => {
          const slicedComment: IComment =
            comment.content.length > 151
              ? {
                  ...comment,
                  content: comment.content.slice(0, 151) + "...",
                }
              : comment;
          return index < 2 || index === comments.length - 1 ? (
            <Box w="100%" key={index}>
              <Comment comment={slicedComment} />
            </Box>
          ) : (
            <></>
          );
        })}
        <Time timeAgo={timeAgo} />
      </Box>
    </>
  );
};

export default PostComments;
