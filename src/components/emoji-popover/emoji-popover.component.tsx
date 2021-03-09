import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Flex, Spacer } from "@chakra-ui/layout";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/popover";
import { Fragment } from "react";
import { VscSmiley } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { IEmoji } from "../../redux/emojies/emojies.interfaces";
import { changeCommentInput } from "../../redux/posts/posts.actions";
import { IPost } from "../../redux/posts/posts.interfaces";
import { State } from "../../redux/store";
import EmojiText from "../emoji-text/emoji-text.component";

interface EmojiPopoverProps {
  postId: string;
}

const EmojiPopover = ({ postId }: EmojiPopoverProps) => {
  const dispatch = useDispatch();
  const emojies: IEmoji[] = useSelector(
    (state: State) => state.emojies.emojiesData
  );
  const commentInput: string | undefined = useSelector(
    (state: State) =>
      state.posts.postsData.find((p: IPost) => p.id === postId)?.commentInput
  );
  const emojiPickHandler = (emoji: IEmoji) => {
    dispatch(
      changeCommentInput(
        postId,
        (commentInput ? commentInput : "") + emoji.content
      )
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
