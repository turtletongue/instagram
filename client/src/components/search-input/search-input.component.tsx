import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  blurSearchInput,
  changeInputValue,
  clearInput,
  closePopover,
  focusSearchInput,
  openPopover,
  requestUsersSearch,
} from "../../redux/search-input/search-input.slice";
import { RootState } from "../../redux/store";
import { IUser } from "../../redux/user/user.slice";
import SearchPopover from "../search-popover/search-popover.component";

const SearchInput = () => {
  const dispatch = useAppDispatch();
  const isFocused: boolean = useAppSelector(
    (state: RootState) => state.searchInput.isFocused
  );
  const inputValue: string = useAppSelector(
    (state: RootState) => state.searchInput.inputValue
  );
  useEffect(() => {
    if (inputValue) {
      dispatch(requestUsersSearch(inputValue));
    }
  }, [dispatch, inputValue]);
  const isLoading: boolean = useAppSelector(
    (state: RootState) => state.searchInput.searchLoading === "loading"
  );
  const searchResult: IUser[] = useAppSelector(
    (state: RootState) => state.searchInput.searchResult
  );
  useEffect(() => {
    if (!!searchResult && !!inputValue && !isLoading && isFocused) {
      dispatch(openPopover());
    } else {
      dispatch(closePopover());
    }
  }, [dispatch, searchResult, inputValue, isLoading, isFocused]);
  const isPopoverOpen: boolean = useAppSelector(
    (state: RootState) => state.searchInput.isPopoverOpen
  );
  return (
    <SearchPopover searchedUsers={searchResult} isOpen={isPopoverOpen}>
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
          {!isLoading ? (
            <Icon
              as={AiFillCloseCircle}
              h={4}
              w={4}
              color="#c7c7c7"
              opacity={isFocused ? 0.8 : 0}
            />
          ) : (
            <Spinner size="xs" />
          )}
        </InputRightElement>
      </InputGroup>
    </SearchPopover>
  );
};

export default SearchInput;
