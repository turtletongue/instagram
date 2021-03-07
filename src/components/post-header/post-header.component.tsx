import { Flex, Spacer, Text, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import { IUser } from '../../redux/signin/signin.interfaces';
import Avatar from '../avatar/avatar.component';

interface PostHeaderProps {
  author: IUser
}

const PostHeader = ({ author }: PostHeaderProps) => {
  return (
    <Flex
      h="3.5rem"
      w="100%"
      bgColor="white"
      align="center"
      p="1rem"
      borderBottomWidth={1}
      borderBottomColor="#efefef"
    >
      <Flex align="center">
        <Link to={`/${author.id}/`}>
          <Avatar src={author.avatar} w="2rem" h="2rem" />
        </Link>
        <Link to={`/${author.id}/`}>
          <Text
            ml="0.8rem"
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
          >{author.id}</Text>
        </Link>
      </Flex>
      <Spacer />
      <Icon
        as={BsThreeDots}
        w={4}
        h={4}
        color="#2a2a2a"
        cursor="pointer"
      />
    </Flex>
  );
}

export default PostHeader;