import { Box } from "@chakra-ui/react";
import { IPost } from "../../redux/posts/posts.interfaces";
import CommentInput from "../comment-input/comment-input.component";
import PostContent from "../post-content/post-content.component";
import PostFooter from "../post-footer/post-footer.component";
import PostHeader from "../post-header/post-header.component";

interface PostContainerProps {
  post: IPost;
}

const PostContainer = ({ post }: PostContainerProps) => {
  return (
    <Box
      maxW="38rem"
      borderWidth="1px"
      borderRadius="3px"
      overflow="hidden"
      mb="2rem"
    >
      <PostHeader author={post.author} />
      <PostContent imageUrl={post.imageUrl} />
      <PostFooter post={post} />
      <CommentInput postId={post.id} />
    </Box>
  );
};

export default PostContainer;
