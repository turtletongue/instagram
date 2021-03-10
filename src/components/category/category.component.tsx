import { Flex, Text } from "@chakra-ui/layout";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { changeActiveCategory } from "../../redux/categories/categories.actions";

interface CategoryProps {
  children: ReactNode;
  title: string;
  isActive: boolean;
}

const Category = ({ children, title, isActive }: CategoryProps) => {
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
      onClick={() => dispatch(changeActiveCategory(title))}
    >
      {children}
      <Text
        ml="0.4rem"
        fontWeight="500"
        fontSize="0.8rem"
        userSelect="none"
        color={isActive ? "" : "#939393"}
      >
        {title.toUpperCase()}
      </Text>
    </Flex>
  );
};

export default Category;
