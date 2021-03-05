import { Box } from '@chakra-ui/react';
import PostHeader from '../post-header/post-header.component';
import PostContent from '../post-content/post-content.component';
import PostFooter from '../post-footer/post-footer.component';

const Post = () => {
  return (
    <Box
      maxW="38rem"
      borderWidth="1px"
      borderRadius="3px"
      overflow="hidden"
    >
      <PostHeader author={{ username: 'alternative.disney', id: '505', avatar: 'https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s320x320/37180174_2128883647392391_2180509584274227200_n.jpg?tp=1&_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=p-XguE5bCK8AX9v4QS1&oh=80bd6ca7e744d819747cd5253d77a6fb&oe=606DB111' }} />
      <PostContent imageUrl="https://scontent-arn2-1.cdninstagram.com/v/t51.2885-15/fr/e15/s1080x1080/155789273_770007063608934_120234005437861096_n.jpg?tp=1&_nc_ht=scontent-arn2-1.cdninstagram.com&_nc_cat=1&_nc_ohc=hSW3tHEk1GYAX8xMnU2&oh=10f1ad2d881737396eacbbc8362bc0d4&oe=606D1DB9" />
      {/* <PostFooter /> */}
    </Box>
  );
}

export default Post;