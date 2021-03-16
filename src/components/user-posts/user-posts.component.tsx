import { Box, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { IPost } from "../../redux/feed/feed.slice";
import { togglePostDataVisibility } from "../../redux/feed/posts.actions";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import MinPostData from "../min-post-data/min-post-data.component";
import PostContent from "../post-content/post-content.component";
import PostPageModal from "../post-page-modal/post-page-modal.component";

interface UserPostsProps {
  posts: IPost[];
}

const UserPosts = ({ posts }: UserPostsProps) => {
  const dispatch = useDispatch();
  const hoveredPostsIds: number[] = useAppSelector(
    (state: RootState) => state.userPage.hoveredPostsIds
  );
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
        const isHovered: boolean = hoveredPostsIds.includes(post.id);
        return (
          <Fragment key={index}>
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
                imageUrl={post.imagesUrls[0] ? post.imagesUrls[0] : ""}
                cursor="pointer"
                filter={isHovered ? "brightness(40%)" : ""}
              />
              {isHovered ? <MinPostData post={post} /> : <></>}
            </Box>
          </Fragment>
        );
      })}
    </SimpleGrid>
  );
};

export default UserPosts;
