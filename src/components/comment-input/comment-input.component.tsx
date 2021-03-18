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
  IPost,
  selectPostById,
  setCommentInput,
} from "../../redux/feed/feed.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { IUser } from "../../redux/user/user.slice";
import EmojiPopover from "../emoji-popover/emoji-popover.component";

interface CommentInputProps {
  postId: number;
  inputRef: any;
  userPage?: boolean;
}

const CommentInput = ({ postId, inputRef }: CommentInputProps) => {
  const dispatch = useAppDispatch();
  const state: RootState = useAppSelector((state: RootState) => state);
  const postData: unknown = selectPostById(state, postId);
  const post: IPost = postData as IPost;
  const commentInput: string | undefined = (post as IPost)?.commentInput;
  const user: IUser | null = useAppSelector(
    (state: RootState) => state.user.currentUser
  );
  const addCommentHandler = () => {
    if (user && commentInput) {
      dispatch(
        addComment({
          id: post.comments.length + 1,
          authorId: user.userId,
          postId: post.id,
          writedAt: new Date().toISOString(),
          isLiked: false,
          likersIds: [],
          content: commentInput,
          replies: [],
        })
      );
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
          onChange={(event) => {
            dispatch(
              setCommentInput({ postId, commentInput: event.target.value })
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
