import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  addComment,
  changeCommentInput,
  clearCommentInput,
} from "../../redux/posts/posts.actions";
import { IUser } from "../../redux/users/users.interfaces";
import EmojiPopover from "../emoji-popover/emoji-popover.component";

interface CommentInputProps {
  postId: string;
  inputRef: any;
}

const CommentInput = ({ postId, inputRef }: CommentInputProps) => {
  const dispatch = useDispatch();
  const commentInput: string | undefined = "";
  const user: IUser | null = null;
  const addCommentHandler = () => {
    if (user && commentInput) {
      dispatch(addComment(postId, user, commentInput));
      dispatch(clearCommentInput(postId));
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
          <EmojiPopover postId={postId} />
        </InputLeftElement>
        <Input
          ref={inputRef}
          value={commentInput ? commentInput : ""}
          onChange={(event) =>
            dispatch(changeCommentInput(postId, event.target.value))
          }
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
