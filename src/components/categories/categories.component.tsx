import Icon from "@chakra-ui/icon";
import { Flex, Spacer } from "@chakra-ui/layout";
import { BsGrid3X3 } from "react-icons/bs";
import { RiBookmarkLine } from "react-icons/ri";
import {
  POSTS_TAB,
  SAVED_TAB,
} from "../../redux/user-page/user-page.constants";
import Category from "../category/category.component";

const Categories = () => {
  const activeCategory: string = "POSTS";
  return (
    <Flex position="relative" top="-1px" maxW="58rem" justify="center">
      <Flex w="10rem">
        <Category category={POSTS_TAB} isActive={activeCategory === POSTS_TAB}>
          <Icon
            as={BsGrid3X3}
            w={3}
            h={3}
            color={activeCategory === POSTS_TAB ? "" : "#939393"}
          />
        </Category>
        <Spacer />
        <Category category={SAVED_TAB} isActive={activeCategory === SAVED_TAB}>
          <Icon
            as={RiBookmarkLine}
            w={3}
            h={3}
            color={activeCategory === SAVED_TAB ? "" : "#939393"}
          />
        </Category>
      </Flex>
    </Flex>
  );
};

export default Categories;
