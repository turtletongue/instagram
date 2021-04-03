import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { POST_PAGE, USER_PAGE } from "../../constants";
import { addComment, IPost } from "../../redux/feed/feed.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addPostPageComment } from "../../redux/post-page/post-page.slice";
import { RootState } from "../../redux/store";
import { addUserPageComment } from "../../redux/user-page/user-page.slice";
import { IUser } from "../../redux/user/user.slice";
import EmojiPopover from "../emoji-popover/emoji-popover.component";

interface CommentInputProps {
  post: IPost;
  inputRef: any;
  page?: string;
}

const CommentInput = ({ post, inputRef, page }: CommentInputProps) => {
  const dispatch = useAppDispatch();
  const user: IUser | null = useAppSelector(
    (state: RootState) => state.user.currentUser
  );
  const token: string | null = localStorage.getItem("authToken");
  const addCommentHandler = () => {
    if (token && user && inputRef.current.value) {
      switch (page) {
        case USER_PAGE:
          dispatch(
            addUserPageComment({
              token,
              postId: +post.id,
              content: inputRef.current.value,
            })
          );
          inputRef.current.value = "";
          break;
        case POST_PAGE:
          dispatch(
            addPostPageComment({
              token,
              postId: +post.id,
              content: inputRef.current.value,
            })
          );
          inputRef.current.value = "";
          break;
        default:
          dispatch(
            addComment({
              token,
              postId: +post.id,
              content: inputRef.current.value,
            })
          );
          inputRef.current.value = "";
          break;
      }
    }
  };
  return (
    <>
      <InputGroup
        d="flex"
        align="center"
        borderTopWidth="1px"
        p="0.5rem"
        bgColor="white"
      >
        <InputLeftElement>
          <EmojiPopover post={post} page={page} inputRef={inputRef} />
        </InputLeftElement>
        <Input
          ref={inputRef}
          onKeyDown={(event) => {
            if (event.key === "Enter") addCommentHandler();
          }}
          size="sm"
          borderRadius={0}
          borderWidth={0}
          type="text"
          placeholder="Add a comment..."
          textOverflow="ellipsis"
          sx={{
            "&:active, &:focus": {
              boxShadow: "none",
            },
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
              "&:active": {
                opacity: 0.6,
              },
            }}
          >
            Post
          </Text>
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default CommentInput;
