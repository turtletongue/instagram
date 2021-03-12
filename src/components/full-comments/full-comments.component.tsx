import { Box, Flex } from "@chakra-ui/layout";
import { IComment } from "../../redux/posts/posts.interfaces";
import findTimeDifference from "../../utils/findTimeDifference.util";
import Avatar from "../avatar/avatar.component";
import Comment from "../comment/comment.component";
import Time from "../time/time.component";

interface FullCommentsProps {
  comments: IComment[];
}

const FullComments = ({ comments }: FullCommentsProps) => {
  return (
    <Box
      p="0.5rem"
      minH="60%"
      maxH="25rem"
      w="100%"
      bgColor="white"
      overflowY="scroll"
      sx={{
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {comments.map((comment: IComment, index: number) => {
        const timeAgo: string = findTimeDifference(comment.date);
        return (
          <Flex key={index} mt="1rem">
            <Avatar src={comment.author.avatar} h="2rem" w="2rem" d="inline" />
            <Box ml="1rem" w="16rem">
              <Comment comment={comment} w="80%" full />
              <Time timeAgo={timeAgo} />
            </Box>
          </Flex>
        );
      })}
    </Box>
  );
};

export default FullComments;
