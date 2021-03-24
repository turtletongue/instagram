import { Box } from "@chakra-ui/react";
import { IPost } from "../../redux/feed/feed.slice";
import PostActions from "../post-actions/post-actions.component";
import PostComments from "../post-comments/post-comments.component";

interface PostFooterProps {
  post: IPost;
  inputRef: any;
  isPostPageOpen: boolean;
  onPostPageOpen: () => void;
  onPostPageClose: () => void;
}

const PostFooter = ({
  post,
  inputRef,
  isPostPageOpen,
  onPostPageClose,
  onPostPageOpen,
}: PostFooterProps) => {
  return (
    <Box bgColor="white" p="0.8rem" maxH="15rem" w="100%">
      <PostActions
        inputRef={inputRef}
        post={post}
        isPostPageOpen={isPostPageOpen}
        onPostPageOpen={onPostPageOpen}
        onPostPageClose={onPostPageClose}
      />
      <PostComments
        postDate={post.createdAt}
        comments={post.comments}
        onPostPageOpen={onPostPageOpen}
      />
    </Box>
  );
};

export default PostFooter;
