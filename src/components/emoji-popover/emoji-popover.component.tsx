import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Flex, Spacer } from "@chakra-ui/layout";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/popover";
import { Fragment } from "react";
import { VscSmiley } from "react-icons/vsc";
import { IEmoji } from "../../redux/emojies/emojies.slice";
import {
  IPost,
  selectPostById,
  setCommentInput,
} from "../../redux/feed/feed.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  selectUserPagePostById,
  setUserPageCommentInput,
} from "../../redux/user-page/user-page.slice";
import EmojiText from "../emoji-text/emoji-text.component";

interface EmojiPopoverProps {
  postId: number;
  userPage?: boolean;
}

const EmojiPopover = ({ postId, userPage }: EmojiPopoverProps) => {
  const dispatch = useAppDispatch();
  const state: RootState = useAppSelector((state: RootState) => state);
  const emojies: IEmoji[] = useAppSelector(
    (state: RootState) => state.emojies.emojiesData
  );
  const postData: unknown = userPage
    ? selectUserPagePostById(state, postId)
    : selectPostById(state, postId);
  const post: IPost = postData as IPost;
  const commentInput: string = post?.commentInput;
  const emojiPickHandler = (emoji: IEmoji) => {
    const commentContent = {
      postId,
      commentInput: (commentInput ? commentInput : "") + emoji.content,
    };
    dispatch(
      userPage
        ? setUserPageCommentInput(commentContent)
        : setCommentInput(commentContent)
    );
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          sx={{
            "&:focus, &:hover": { boxShadow: "none", bgColor: "transparent" },
          }}
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
      <PopoverContent sx={{ "&:focus": { boxShadow: "none" } }}>
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
          {emojies.map((emoji: IEmoji, index: number) => {
            return (
              <Fragment key={index}>
                <EmojiText
                  fontSize="xl"
                  cursor="pointer"
                  onClick={() => emojiPickHandler(emoji)}
                >
                  {emoji.content}
                </EmojiText>
                {index !== emojies.length - 1 ? <Spacer /> : <></>}
              </Fragment>
            );
          })}
        </Flex>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPopover;
