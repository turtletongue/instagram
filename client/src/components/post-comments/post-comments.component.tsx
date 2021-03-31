import { Box, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import { IComment } from "../../redux/feed/feed.slice";
import findTimeDifference from "../../utils/findTimeDifference.util";
import Comment from "../comment/comment.component";
import Time from "../time/time.component";

interface PostCommentsProps {
  postDate: string;
  comments: IComment[];
  onPostPageOpen: () => void;
}

const PostComments = ({
  postDate,
  comments,
  onPostPageOpen,
}: PostCommentsProps) => {
  const timeAgo: string = findTimeDifference(new Date(Date.parse(postDate)));
  return (
    <>
      <Box>
        {comments.map((comment: IComment, index: number) => {
          const slicedComment: IComment =
            comment.content.length > 111
              ? {
                  ...comment,
                  content: comment.content.slice(0, 111) + "...",
                }
              : comment;
          return index < 2 || index === comments.length - 1 ? (
            <Box w="100%" key={index}>
              <Comment comment={slicedComment} />
            </Box>
          ) : index === 2 ? (
            <Text
              key={index}
              color="#adadad"
              fontSize="sm"
              cursor="pointer"
              onClick={onPostPageOpen}
            >
              View all {comments.length} comments
            </Text>
          ) : (
            <Fragment key={index} />
          );
        })}
        <Time timeAgo={timeAgo} />
      </Box>
    </>
  );
};

export default PostComments;
