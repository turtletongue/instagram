import { Box, Flex } from "@chakra-ui/layout";
import { useEffect } from "react";
import { IComment } from "../../redux/feed/feed.slice";
import {
  IAuthorData,
  requestAuthorsData,
  selectAuthorById,
} from "../../redux/full-comments/full-comments.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import findTimeDifference from "../../utils/findTimeDifference.util";
import Avatar from "../avatar/avatar.component";
import Comment from "../comment/comment.component";
import Time from "../time/time.component";

interface FullCommentsProps {
  comments: IComment[];
  page?: string;
}

const FullComments = ({ comments, page }: FullCommentsProps) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state);
  useEffect(() => {
    dispatch(
      requestAuthorsData({
        testData: [
          {
            id: "lindsayjmariiiie",
            avatarUrl:
              "https://scontent-frt3-2.cdninstagram.com/v/t51.2885-19/s320x320/155904422_2917555351904386_8800238870889888993_n.jpg?tp=1&_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_ohc=ihahnk4eLE4AX-iLodu&oh=1910453061d1bcfb142be6a7e581548c&oe=60785837",
          },
          {
            id: "lindsayjmarie",
            avatarUrl:
              "https://scontent-frt3-2.cdninstagram.com/v/t51.2885-19/s320x320/155904422_2917555351904386_8800238870889888993_n.jpg?tp=1&_nc_ht=scontent-frt3-2.cdninstagram.com&_nc_ohc=ihahnk4eLE4AX-iLodu&oh=1910453061d1bcfb142be6a7e581548c&oe=60785837",
          },
        ],
      })
    );
  }, [dispatch]);
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
        const authorData: unknown = selectAuthorById(state, comment.authorName);
        return (
          <Flex key={index} mt="1rem">
            <Avatar
              src={
                (authorData as IAuthorData)?.avatarUrl
                  ? (authorData as IAuthorData)?.avatarUrl
                  : ""
              }
              h="2rem"
              w="2rem"
              d="inline"
            />
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
