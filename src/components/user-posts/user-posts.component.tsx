import { Box, SimpleGrid } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { togglePostDataVisibility } from "../../redux/posts/posts.actions";
import { IPost } from "../../redux/posts/posts.interfaces";
import PostContent from "../post-content/post-content.component";

interface UserPostsProps {
  posts: IPost[];
}

const UserPosts = ({ posts }: UserPostsProps) => {
  const dispatch = useDispatch();
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
          <Box
            key={index}
            maxW="18rem"
            position="relative"
            onMouseEnter={() => dispatch(togglePostDataVisibility(post.id))}
            onMouseLeave={() => dispatch(togglePostDataVisibility(post.id))}
          >
            <PostContent
              imageUrl={post.imageUrl}
              cursor="pointer"
              sx={{ "&:hover": { filter: "brightness(40%)" } }}
            />
            {post.isDataVisible ? (
              <Box
                zIndex="2"
                position="absolute"
                w="5rem"
                h="5rem"
                m="auto"
                top={0}
                bottom={0}
                left={0}
                right={0}
                bgColor="tomato"
              />
            ) : (
              <></>
            )}
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default UserPosts;
