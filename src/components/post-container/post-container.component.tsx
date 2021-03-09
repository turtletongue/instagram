import { Box } from "@chakra-ui/react";
import { useRef } from "react";
import { IPost } from "../../redux/posts/posts.interfaces";
import CommentInput from "../comment-input/comment-input.component";
import PostContent from "../post-content/post-content.component";
import PostFooter from "../post-footer/post-footer.component";
import PostHeader from "../post-header/post-header.component";

interface PostContainerProps {
  post: IPost;
}

const PostContainer = ({ post }: PostContainerProps) => {
  const inputRef: any = useRef(null);
  return (
    <Box
      maxW="38rem"
      borderWidth="1px"
      borderRadius="3px"
      overflow="hidden"
      mb="2rem"
    >
      <PostHeader author={post.author} postId={post.id} />
      <PostContent imageUrl={post.imageUrl} />
      <PostFooter inputRef={inputRef} post={post} />
      <CommentInput inputRef={inputRef} postId={post.id} />
    </Box>
  );
};

export default PostContainer;
