import { Box, Flex } from "@chakra-ui/layout";
import { IComment } from "../../redux/feed/feed.slice";
import findTimeDifference from "../../utils/findTimeDifference.util";
import Avatar from "../avatar/avatar.component";
import Comment from "../comment/comment.component";
import Time from "../time/time.component";

interface FullCommentsProps {
  comments: IComment[];
  page?: string;
}

const FullComments = ({ comments, page }: FullCommentsProps) => {
  return (
    <Box
      p="0.5rem"
      h="30rem"
      w="100%"
      bgColor="white"
      overflowY="scroll"
      sx={{
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {comments.map((comment: IComment, index: number) => {
        const timeAgo: string = findTimeDifference(
          new Date(Date.parse(comment.createdAt))
        );
        return (
          <Flex key={index} mt="1rem">
            <Avatar src={comment.authorAvatar} h="2rem" w="2rem" d="inline" />
            <Box ml="1rem" w="16rem">
              <Comment comment={comment} w="80%" page={page} full />
              <Time timeAgo={timeAgo} />
            </Box>
          </Flex>
        );
      })}
    </Box>
  );
};

export default FullComments;
