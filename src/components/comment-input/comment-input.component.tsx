import { Fragment } from 'react';
import {
  InputGroup, Input, InputRightElement, InputLeftElement,
  Icon,
  Text,
  Popover, PopoverTrigger, PopoverContent,
  Button,
  Flex,
  Spacer
} from '@chakra-ui/react';
import { VscSmiley } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { IEmoji } from '../../redux/emojies/emojies.interfaces';
import { addComment, changeCommentInput, clearCommentInput } from '../../redux/posts/posts.actions';
import { IPost } from '../../redux/posts/posts.interfaces';
import { State } from '../../redux/store';
import EmojiText from '../emoji-text/emoji-text.component';

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
    if (userId && commentInput) {
      dispatch(addComment(postId, userId, commentInput));
      dispatch(clearCommentInput(postId));
    }
  }
  const emojies: IEmoji[] = useSelector((state: State) => state.emojies.emojiesData);
  const emojiPickHandler = (emoji: IEmoji) => {
    dispatch(changeCommentInput(postId, (commentInput ? commentInput : '') + emoji.content));
  }
  return (
    <>
      <InputGroup d="flex" align="center" borderTopWidth="1px" p="0.5rem" bgColor="white">
        <InputLeftElement>
          <Popover>
            <PopoverTrigger>
              <Button
                sx={{ '&:focus, &:hover': { boxShadow: "none", bgColor: "transparent" } }}
                bgColor="transparent"
              >
                <Icon
                  as={VscSmiley}
                  mt="0.5rem"
                  ml="0.5rem"
                  cursor="pointer"
                  w={7}
                  h={7}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent sx={{ '&:focus': { boxShadow: "none" } }}>
              <Flex
                p="1rem"
                align="center"
                bgColor="white"
                w="15rem"
                h="3.5rem"
                borderRadius="5px"
                boxShadow="md"
                overflow="hidden"
              >
                {
                  emojies.map((emoji: IEmoji, index: number) => {
                    return (
                      <Fragment key={index} >
                        <EmojiText
                          fontSize="xl"
                          cursor="pointer"
                          onClick={() => emojiPickHandler(emoji)}
                        >{ emoji.content }</EmojiText>
                        { index !== emojies.length - 1 ? <Spacer /> : <></> }
                      </Fragment>
                    );
                  })
                }
              </Flex>
            </PopoverContent>
          </Popover>
        </InputLeftElement>
        <Input
          value={commentInput ? commentInput : ''}
          onChange={
            (event) => dispatch(changeCommentInput(postId, event.target.value))
          }
          onKeyDown={(event) => {
            if (event.key === 'Enter') addCommentHandler();
          }}
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
    </>
  );
}

export default CommentInput;