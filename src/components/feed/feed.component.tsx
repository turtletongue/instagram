import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { IPost } from '../../redux/posts/posts.interfaces';
import { State } from '../../redux/store';
import PostContainer from '../post-container/post-container.component';

const Feed = () => {
  const posts: IPost[] = useSelector((state: State) => state.posts.postsData);
  return (
    <Box p="6rem 0 1rem 12rem">
      {
        posts.map(post => {
          return <PostContainer key={post.id} post={post} />
        })
      }
    </Box>
  );
}

export default Feed;