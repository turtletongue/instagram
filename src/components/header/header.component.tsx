import { Flex, Spacer } from '@chakra-ui/react';
import Logo from '../logo/logo.component';
import SearchInput from '../search-input/search-input.component';
import Avatar from '../avatar/avatar.component';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '../../redux/store';
import { IUser } from '../../redux/signin/signin.interfaces';

const Header = () => {
  const user: IUser | null = useSelector((state: State) => state.signIn.user);
  return (
    <Flex
      p="0 12rem 0"
      h="3.4rem"
      bgColor="white"
      borderBottomWidth="1px"
      borderColor="blackAlpha.300"
      align="center"
    >
      <Link to="/">
        <Logo
          fontSize="3xl"
          cursor="pointer"
          sx={{
            '&:active': {
              opacity: 0.6
            }
          }}
        />
      </Link>
      <Spacer />
      <SearchInput />
      <Spacer />
      <Avatar src={user?.avatar ? user?.avatar : null} />
    </Flex>
  );
}

export default Header;