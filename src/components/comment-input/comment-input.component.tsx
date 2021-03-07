import { InputGroup, Input, InputRightElement, InputLeftElement, Icon, Text } from '@chakra-ui/react';
import { VscSmiley } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, changeCommentInput, clearCommentInput } from '../../redux/posts/posts.actions';
import { IPost } from '../../redux/posts/posts.interfaces';
import { State } from '../../redux/store';

interface CommentInputProps {
  postId: string;
}

const CommentInput = ({ postId }: CommentInputProps) => {
  const dispatch = useDispatch();
  const commentInput: string | undefined = useSelector((state: State) => state.posts.postsData.find(
    (p: IPost) => p.id === postId
  )?.commentInput);
  const userId: string | undefined = useSelector((state: State) => state.signIn.user?.id);
  const addCommentHandler = () => {
    if (userId) {
      dispatch(addComment(postId, userId, commentInput ? commentInput : ''));
      dispatch(clearCommentInput(postId));
    }
  }
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
        value={commentInput ? commentInput : ''}
        onChange={
          (event) => dispatch(changeCommentInput(postId, event.target.value))
        }
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
          onClick={addCommentHandler}
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