import { Flex, Text } from "@chakra-ui/layout";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { showPosts, showSaved } from "../../redux/user-page/user-page.actions";
import { POSTS } from "../../redux/user-page/user-page.slice";

interface CategoryProps {
  children: ReactNode;
  category: string;
  isActive: boolean;
}

const Category = ({ children, category, isActive }: CategoryProps) => {
  const dispatch = useDispatch();
  return (
    <Flex
      align="center"
      cursor="pointer"
      sx={{ "&:active": { opacity: 0.6 } }}
      borderTopWidth={isActive ? 1 : 0}
      borderTopStyle="solid"
      borderTopColor="blackAlpha.800"
      pt="1rem"
      onClick={() => dispatch(category === POSTS ? showPosts() : showSaved())}
    >
      {children}
      <Text
        ml="0.4rem"
        fontWeight="500"
        fontSize="0.8rem"
        userSelect="none"
        color={isActive ? "" : "#939393"}
      >
        {category}
      </Text>
    </Flex>
  );
};

export default Category;
