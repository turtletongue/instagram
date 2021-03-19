import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import {
  addComment,
  clearCommentInput,
  IComment,
  IPost,
  selectPostById,
  setCommentInput,
} from "../../redux/feed/feed.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  addUserPageComment,
  clearUserPageCommentInput,
  selectUserPagePostById,
  setUserPageCommentInput,
} from "../../redux/user-page/user-page.slice";
import { IUser } from "../../redux/user/user.slice";
import EmojiPopover from "../emoji-popover/emoji-popover.component";

interface CommentInputProps {
  postId: number;
  inputRef: any;
  userPage?: boolean;
}

const CommentInput = ({ postId, inputRef, userPage }: CommentInputProps) => {
  const dispatch = useAppDispatch();
  const state: RootState = useAppSelector((state: RootState) => state);
  const postData: unknown = userPage
    ? selectUserPagePostById(state, postId)
    : selectPostById(state, postId);
  const post: IPost = postData as IPost;
  const commentInput: string | undefined = (post as IPost)?.commentInput;
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
      dispatch(
        userPage ? addUserPageComment(commentData) : addComment(commentData)
      );
      dispatch(
        userPage ? clearUserPageCommentInput(postId) : clearCommentInput(postId)
      );
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
          <EmojiPopover postId={postId} userPage={userPage} />
        </InputLeftElement>
        <Input
          ref={inputRef}
          value={commentInput ? commentInput : ""}
          onChange={(event) => {
            const commentInput = { postId, commentInput: event.target.value };
            dispatch(
              userPage
                ? setUserPageCommentInput(commentInput)
                : setCommentInput(commentInput)
            );
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
