import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import { IPost } from "../../redux/feed/feed.slice";
import findTimeDifference from "../../utils/findTimeDifference.util";
import CommentInput from "../comment-input/comment-input.component";
import FullComments from "../full-comments/full-comments.component";
import PostActions from "../post-actions/post-actions.component";
import PostContent from "../post-content/post-content.component";
import PostFooter from "../post-footer/post-footer.component";
import PostHeader from "../post-header/post-header.component";
import Time from "../time/time.component";

interface PostContainerProps {
  post: IPost;
  full?: boolean;
}

const PostContainer = ({ post, full }: PostContainerProps) => {
  const inputRef: any = useRef(null);
  const timeAgo: string = findTimeDifference(
    new Date(Date.parse(post.createdAt))
  );
  const {
    isOpen: isPostPageOpen,
    onOpen: onPostPageOpen,
    onClose: onPostPageClose,
  } = useDisclosure();
  return (
    <Box
      maxW={full ? "60rem" : "38rem"}
      borderWidth="1px"
      borderRadius="3px"
      overflow="hidden"
      mt="2rem"
    >
      {full ? (
        <>
          <Flex>
            <PostContent
              w="40rem"
              imageUrl={post.imagesUrls[0] ? post.imagesUrls[0] : ""}
            />
            <Box w="20rem" borderLeftWidth="1px">
              <PostHeader h="4.5rem" author={post.author} postId={post.id} />
              <FullComments comments={post.comments} />
              <Box h="35%">
                <Box p="0.8rem" bgColor="white" borderTopWidth="1px">
                  <PostActions
                    post={post}
                    inputRef={inputRef}
                    isPostPageOpen={isPostPageOpen}
                    onPostPageOpen={onPostPageOpen}
                    onPostPageClose={onPostPageClose}
                    full
                  />
                  <Time timeAgo={timeAgo} />
                </Box>
                <CommentInput inputRef={inputRef} postId={post.id} />
              </Box>
            </Box>
          </Flex>
        </>
      ) : (
        <>
          <PostHeader author={post.author} postId={post.id} />
          <PostContent
            imageUrl={post.imagesUrls[0] ? post.imagesUrls[0] : ""}
          />
          <PostFooter
            inputRef={inputRef}
            post={post}
            isPostPageOpen={isPostPageOpen}
            onPostPageOpen={onPostPageOpen}
            onPostPageClose={onPostPageClose}
          />
          <CommentInput inputRef={inputRef} postId={post.id} />
        </>
      )}
    </Box>
  );
};

export default PostContainer;
