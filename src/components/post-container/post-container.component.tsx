import { Box } from '@chakra-ui/react';
import PostHeader from '../post-header/post-header.component';
import PostContent from '../post-content/post-content.component';
import PostFooter from '../post-footer/post-footer.component';
import CommentInput from '../comment-input/comment-input.component';
import { IPost } from '../../redux/posts/posts.interfaces';

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
    >
      <PostHeader author={post.author} />
      <PostContent imageUrl={post.imageUrl} />
      <PostFooter post={post} />
      <CommentInput />
    </Box>
  );
}

export default PostContainer;