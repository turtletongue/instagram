import Icon from "@chakra-ui/icon";
import { Flex, Spacer } from "@chakra-ui/layout";
import { BsGrid3X3 } from "react-icons/bs";
import { RiBookmarkLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { POSTS, SAVED } from "../../redux/categories/categories.constants";
import { State } from "../../redux/store";
import Category from "../category/category.component";

const Categories = () => {
  const activeCategory: string = useSelector(
    (state: State) => state.categories.activeCategory
  );
  return (
    <Flex position="relative" top="-1px" maxW="58rem" justify="center">
      <Flex w="10rem">
        <Category title={POSTS} isActive={activeCategory === POSTS}>
          <Icon
            as={BsGrid3X3}
            w={3}
            h={3}
            color={activeCategory === POSTS ? "" : "#939393"}
          />
        </Category>
        <Spacer />
        <Category title={SAVED} isActive={activeCategory === SAVED}>
          <Icon
            as={RiBookmarkLine}
            w={3}
            h={3}
            color={activeCategory === SAVED ? "" : "#939393"}
          />
        </Category>
      </Flex>
    </Flex>
  );
};

export default Categories;
