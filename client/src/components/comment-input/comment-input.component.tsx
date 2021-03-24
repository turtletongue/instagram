import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { POST_PAGE, USER_PAGE } from "../../constants";
import {
  addComment,
  clearCommentInput,
  IComment,
  IPost,
  setCommentInput,
} from "../../redux/feed/feed.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  addPostPageComment,
  clearPostPageCommentInput,
  setPostPageCommentInput,
} from "../../redux/post-page/post-page.slice";
import { RootState } from "../../redux/store";
import {
  addUserPageComment,
  clearUserPageCommentInput,
  setUserPageCommentInput,
} from "../../redux/user-page/user-page.slice";
import { IUser } from "../../redux/user/user.slice";
import EmojiPopover from "../emoji-popover/emoji-popover.component";

interface CommentInputProps {
  post: IPost;
  inputRef: any;
  page?: string;
}

const CommentInput = ({ post, inputRef, page }: CommentInputProps) => {
  const dispatch = useAppDispatch();
  const commentInput: string = post.commentInput;
  const user: IUser | null = useAppSelector(
    (state: RootState) => state.user.currentUser
  );
  const addCommentHandler = () => {
    if (user && commentInput) {
      const commentData: IComment = {
        id: post.comments.length + 1,
        authorId: user.userId,
        postId: post.id,
        writedAt: new Date().toISOString(),
        isLiked: false,
        content: commentInput,
        replies: [],
      };
      switch (page) {
        case USER_PAGE:
          dispatch(addUserPageComment(commentData));
          dispatch(clearUserPageCommentInput(post.id));
          break;
        case POST_PAGE:
          dispatch(addPostPageComment(commentData));
          dispatch(clearPostPageCommentInput());
          break;
        default:
          dispatch(addComment(commentData));
          dispatch(clearCommentInput(post.id));
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
          <EmojiPopover post={post} page={page} />
        </InputLeftElement>
        <Input
          ref={inputRef}
          value={commentInput ? commentInput : ""}
          onChange={(event) => {
            const commentInput = {
              postId: post.id,
              commentInput: event.target.value,
            };
            switch (page) {
              case USER_PAGE:
                dispatch(setUserPageCommentInput(commentInput));
                break;
              case POST_PAGE:
                dispatch(setPostPageCommentInput(event.target.value));
                break;
              default:
                dispatch(setCommentInput(commentInput));
                break;
            }
          }}
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
