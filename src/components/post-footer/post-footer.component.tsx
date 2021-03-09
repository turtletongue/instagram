import { Box } from "@chakra-ui/react";
import { IPost } from "../../redux/posts/posts.interfaces";
import PostActions from "../post-actions/post-actions.component";
import PostComments from "../post-comments/post-comments.component";

interface PostFooterProps {
  post: IPost;
  inputRef: any;
}

const PostFooter = ({ post, inputRef }: PostFooterProps) => {
  return (
    <Box bgColor="white" p="0.8rem" maxH="15rem" w="100%">
      <PostActions inputRef={inputRef} post={post} />
      <PostComments
        postId={post.id}
        postDate={post.date}
        comments={post.comments}
      />
    </Box>
  );
};

export default PostFooter;
