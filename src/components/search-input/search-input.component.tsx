import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  blurSearchInput,
  changeInputValue,
  clearInput,
  focusSearchInput,
} from "../../redux/search-input/search-input.slice";
import { RootState } from "../../redux/store";

const SearchInput = () => {
  const dispatch = useAppDispatch();
  const isFocused: boolean = useAppSelector(
    (state: RootState) => state.searchInput.isFocused
  );
  const inputValue: string = useAppSelector(
    (state: RootState) => state.searchInput.inputValue
  );
  return (
    <InputGroup maxW="13rem">
      <InputLeftElement
        pointerEvents="none"
        h="1.7rem"
        d="flex"
        pl={isFocused ? "0" : "4.4rem"}
        justify="center"
        align="center"
        children={<Icon as={BiSearch} h={3} w={3} color="#a5a7aa" />}
      />
      <Input
        value={inputValue}
        onChange={(event) => dispatch(changeInputValue(event.target.value))}
        onFocus={() => dispatch(focusSearchInput())}
        onBlur={() => dispatch(blurSearchInput())}
        h="1.7rem"
        pl={isFocused ? "1.8rem" : "5rem"}
        bgColor="#fafafa"
        borderWidth="1px"
        borderColor="blackAlpha.300"
        borderRadius="2px"
        sx={{
          "&:focus": {
            boxShadow: "none",
            borderColor: "blackAlpha.400",
          },
        }}
        placeholder="Search"
        fontSize="sm"
      />
      <InputRightElement
        h="1.7rem"
        w="1.8rem"
        d="flex"
        justify="center"
        align="center"
        cursor="default"
        onMouseDown={isFocused ? () => dispatch(clearInput()) : () => {}}
      >
        <Icon
          as={AiFillCloseCircle}
          h={4}
          w={4}
          color="#c7c7c7"
          opacity={isFocused ? 0.8 : 0}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
