import { Flex, Spacer, useMediaQuery } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import IconsGroup from "../icons-group/icons-group.component";
import Logo from "../logo/logo.component";
import SearchInput from "../search-input/search-input.component";

const Header = () => {
  const [isLessThan820] = useMediaQuery("(max-width: 820px)");
  return (
    <Flex
      w="100%"
      p={isLessThan820 ? "1rem" : "0 12rem 0"}
      h="3.4rem"
      bgColor="white"
      borderBottomWidth="1px"
      borderColor="blackAlpha.300"
      align="center"
      position="fixed"
      top={0}
      zIndex="3"
    >
      <Link to="/">
        <Logo
          fontSize="3xl"
          cursor="pointer"
          sx={{
            "&:active": {
              opacity: 0.6,
            },
          }}
        />
      </Link>
      {isLessThan820 ? (
        <></>
      ) : (
        <>
          <Spacer />
          <SearchInput />
        </>
      )}
      <Spacer />
      <IconsGroup />
    </Flex>
  );
};

export default Header;
