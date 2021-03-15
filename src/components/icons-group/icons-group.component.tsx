import { Center, Flex, Icon, Spacer } from "@chakra-ui/react";
import {
  AiFillHeart,
  AiFillHome,
  AiOutlineHeart,
  AiOutlineHome,
} from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { IUser } from "../../redux/user/user.slice";
import Avatar from "../avatar/avatar.component";

const IconsGroup = () => {
  const history = useHistory();
  // const dispatch = useAppDispatch();
  const user: IUser | null = useAppSelector(
    (state: RootState) => state.user.currentUser
  );
  const isActivityOpen: boolean = false;
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
            onClick={() => {}} //toggle activity
          />
          <Spacer />
          <Center w="1.7rem" h="1.7rem">
            <Link to={`/${user.userId}/`}>
              <Avatar
                src={user.avatarUrl}
                borderWidth={
                  history.location.pathname === `/${user.userId}/`
                    ? "0.1rem"
                    : 0
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
