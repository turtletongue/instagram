import { Center, Flex, Icon, Spacer } from "@chakra-ui/react";
import {
  AiFillHeart,
  AiFillHome,
  AiOutlineHeart,
  AiOutlineHome,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toggleActivity } from "../../redux/menu/menu.actions";
import { State } from "../../redux/store";
import { IUser } from "../../redux/users/users.interfaces";
import Avatar from "../avatar/avatar.component";

const IconsGroup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user: IUser | null = useSelector((state: State) => state.signIn.user);
  const isActivityOpen: boolean = useSelector(
    (state: State) => state.menu.isActivityOpen
  );
  return (
    <Flex align="center" minW="7rem">
      <Link to="/">
        <Icon
          as={history.location.pathname === "/" ? AiFillHome : AiOutlineHome}
          h={6}
          w={6}
          cursor="pointer"
        />
      </Link>
      <Spacer />
      {user ? (
        <>
          <Icon
            as={isActivityOpen ? AiFillHeart : AiOutlineHeart}
            h={6}
            w={6}
            cursor="pointer"
            onClick={() => dispatch(toggleActivity())}
          />
          <Spacer />
          <Center w="1.7rem" h="1.7rem">
            <Link to={`/${user.id}/`}>
              <Avatar
                src={user?.avatar ? user?.avatar : null}
                borderWidth={
                  history.location.pathname === `/${user.id}/` ? "0.1rem" : 0
                }
                borderColor="black"
                borderStyle="solid"
                alt=""
              />
            </Link>
          </Center>
        </>
      ) : (
        <></>
      )}
    </Flex>
  );
};

export default IconsGroup;
