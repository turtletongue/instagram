import { Center, Flex, Icon, Spacer } from "@chakra-ui/react";
import {
  AiFillHeart,
  AiFillHome,
  AiOutlineHeart,
  AiOutlineHome,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changePosition } from "../../redux/menu/menu.actions";
import { ACTIVITY, HOME, PROFILE } from "../../redux/menu/menu.constants";
import { IUser } from "../../redux/signin/signin.interfaces";
import { State } from "../../redux/store";
import Avatar from "../avatar/avatar.component";

const IconsGroup = () => {
  const dispatch = useDispatch();
  const user: IUser | null = useSelector((state: State) => state.signIn.user);
  const position: string = useSelector((state: State) => state.menu.position);
  return (
    <Flex align="center" minW="7rem">
      <Link to="/">
        <Icon
          as={position === HOME ? AiFillHome : AiOutlineHome}
          h={6}
          w={6}
          cursor="pointer"
          onClick={() => dispatch(changePosition(HOME))}
        />
      </Link>
      <Spacer />
      {user ? (
        <>
          <Icon
            as={position === ACTIVITY ? AiFillHeart : AiOutlineHeart}
            h={6}
            w={6}
            cursor="pointer"
            onClick={() => dispatch(changePosition(ACTIVITY))}
          />
          <Spacer />
          <Center w="1.7rem" h="1.7rem">
            <Avatar
              src={user?.avatar ? user?.avatar : null}
              borderWidth={position === PROFILE ? "0.1rem" : 0}
              borderColor="black"
              borderStyle="solid"
              onClick={() => dispatch(changePosition(PROFILE))}
            />
          </Center>
        </>
      ) : (
        <></>
      )}
    </Flex>
  );
};

export default IconsGroup;
