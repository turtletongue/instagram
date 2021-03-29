import { Box, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { Fragment } from "react";
import { USER_PAGE } from "../../constants";
import { IPost } from "../../redux/feed/feed.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  blurPosts,
  hoverPostById,
  selectUserPagePostById,
  setClickedPostId,
} from "../../redux/user-page/user-page.slice";
import MinPostData from "../min-post-data/min-post-data.component";
import PostContent from "../post-content/post-content.component";
import PostPageModal from "../post-page-modal/post-page-modal.component";

interface UserPostsProps {
  posts: IPost[];
}

const UserPosts = ({ posts }: UserPostsProps) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state);
  const hoveredPostId: number | null = useAppSelector(
    (state: RootState) => state.userPage.hoveredPostId
  );
  const clickedPostId: number = useAppSelector(
    (state: RootState) => state.userPage.clickedPostId
  );
  const clickedPost: IPost | null = selectUserPagePostById(
    state,
    clickedPostId
  ) as IPost | null;
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
      <PostPageModal
        post={clickedPost}
        isOpen={isPostPageOpen}
        onClose={onPostPageClose}
        page={USER_PAGE}
      />
      {posts.map((post: IPost, index: number) => {
        const isHovered: boolean = post.id === hoveredPostId;
        return (
          <Fragment key={index}>
            <Box
              key={index}
              maxW="18rem"
              position="relative"
              onMouseOver={() => dispatch(hoverPostById(post.id))}
              onMouseLeave={() => dispatch(blurPosts())}
              onClick={() => {
                dispatch(setClickedPostId(post.id));
                onPostPageOpen();
              }}
            >
              <PostContent
                imageUrl={post.imageUrl}
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
