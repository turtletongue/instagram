import { InputGroup, Input, InputLeftElement, InputRightElement, Icon } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../redux/store';
import { toggleFocusInput } from '../../redux/search-input/search-input.actions';

const SearchInput = () => {
  const dispatch = useDispatch();
  const isFocused: boolean = useSelector((state: State) => state.searchInput.isFocused);
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
        onFocus={() => dispatch(toggleFocusInput())}
        onBlur={() => dispatch(toggleFocusInput())}
        h="1.7rem"
        pl={isFocused ? "1.8rem" : "5rem"}
        bgColor="#fafafa"
        borderWidth="1px"
        borderColor="blackAlpha.300"
        borderRadius="2px"
        sx={{
          '&:focus': {
            boxShadow: "none",
            borderColor: "blackAlpha.400"
          }
        }}
        placeholder="Search"
        fontSize="sm"
      />
      {
        isFocused ? (
          <InputRightElement
            h="1.7rem"
            w="1.8rem"
            d="flex"
            justify="center"
            align="center"
            cursor="default"
          >
            <Icon
              as={AiFillCloseCircle}
              h={4}
              w={4}
              color="#c7c7c7"
              opacity={0.8}
            />
        </InputRightElement>
        ) : <></>
      }
    </InputGroup>
  );
}

export default SearchInput;