import { Box, Text, Flex, Spacer, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { IComment } from '../../redux/posts/posts.interfaces';
import findTimeDifference from '../../utils/findTimeDifference.util';
import EmojiText from '../emoji-text/emoji-text.component';

interface PostCommentsProps {
  postDate: Date;
  comments: IComment[];
}

const PostComments = ({ postDate, comments }: PostCommentsProps) => {
  const timeAgo: string = findTimeDifference(postDate);
  return (
    <>
      <Box>
        {
          comments.map(comment => {
            return (
              <Flex align="center" key={comment.id}>
                <Link to={`/${comment.authorId}/`}>
                  <Text
                    display="inline"
                    fontSize="sm"
                    fontWeight="500"
                    color="#2a2a2a"
                    sx={{
                      '&:hover': {
                        textDecoration: 'underline'
                      },
                      '&:active': {
                        opacity: 0.6
                      }
                    }} 
                  >{comment.authorId}</Text>
                </Link>
                <EmojiText
                  ml="0.3rem"
                  display="inline"
                  fontSize="sm"
                >
                  { comment.content }
                </EmojiText>
                <Spacer />
                <Icon
                  as={AiOutlineHeart}
                  w={3}
                  h={3}
                  cursor="pointer"
                />
              </Flex>
            );
          })
        }
        <Text
          fontWeight="400"
          color="#adadad"
          fontSize="0.6rem"
          mt="0.3rem"
        >
          { timeAgo }
        </Text> 
      </Box>
    </>
  );
}

export default PostComments;