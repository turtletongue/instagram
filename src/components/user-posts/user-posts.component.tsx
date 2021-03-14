import { Box, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { togglePostDataVisibility } from "../../redux/posts/posts.actions";
import { IPost } from "../../redux/posts/posts.interfaces";
import MinPostData from "../min-post-data/min-post-data.component";
import PostContent from "../post-content/post-content.component";
import PostPageModal from "../post-page-modal/post-page-modal.component";

interface UserPostsProps {
  posts: IPost[];
}

const UserPosts = ({ posts }: UserPostsProps) => {
  const dispatch = useDispatch();
  const {
    isOpen: isPostPageOpen,
    onOpen: onPostPageOpen,
    onClose: onPostPageClose,
  } = useDisclosure();
  return (
    <SimpleGrid
      minChildWidth="16rem"
      maxW="65rem"
      columns={3}
      spacing="1.5rem"
      mt="1rem"
    >
      {posts.map((post: IPost, index: number) => {
        return (
          <>
            <PostPageModal
              post={post}
              isOpen={isPostPageOpen}
              onClose={onPostPageClose}
            />
            <Box
              key={index}
              maxW="18rem"
              position="relative"
              onMouseEnter={() => dispatch(togglePostDataVisibility(post.id))}
              onMouseLeave={() => dispatch(togglePostDataVisibility(post.id))}
              onClick={onPostPageOpen}
            >
              <PostContent
                imageUrl={post.imageUrl}
                cursor="pointer"
                filter={post.isDataVisible ? "brightness(40%)" : ""}
              />
              {post.isDataVisible ? <MinPostData post={post} /> : <></>}
            </Box>
          </>
        );
      })}
    </SimpleGrid>
  );
};

export default UserPosts;
