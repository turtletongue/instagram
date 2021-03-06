import { InputGroup, Input, InputRightElement, InputLeftElement, Icon, Text } from '@chakra-ui/react';
import { VscSmiley } from 'react-icons/vsc';

const CommentInput = () => {
  return (
    <InputGroup d="flex" align="center" borderTopWidth="1px" p="0.5rem" bgColor="white">
      <InputLeftElement>
        <Icon
          as={VscSmiley}
          mt="0.5rem"
          ml="0.5rem"
          cursor="pointer"
          w={7}
          h={7}
        />
      </InputLeftElement>
      <Input
        size="sm"
        borderRadius={0}
        borderWidth={0}
        type="text"
        placeholder="Add a comment..."
        textOverflow="ellipsis"
        sx={{
          '&:active, &:focus': {
            boxShadow: "none"
          }
        }}
      />
      <InputRightElement>
        <Text
          userSelect="none"
          mt="0.5rem"
          mr="0.5rem"
          fontWeight="600"
          fontSize="sm"
          color="blue.400"
          cursor="pointer"
          sx={{
            '&:active': {
              opacity: 0.6
            }
          }}
        >
          Post
        </Text>
      </InputRightElement>
    </InputGroup>
  );
}

export default CommentInput;