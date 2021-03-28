import { Box, Center, Flex, Icon, Spacer } from "@chakra-ui/react";
import {
  AiFillHeart,
  AiFillHome,
  AiOutlineHeart,
  AiOutlineHome,
} from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import {
  hideActivities,
  showActivities,
} from "../../redux/header/header.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { IUser } from "../../redux/user/user.slice";
import ActivityPopover from "../activity-popover/activity-popover.component";
import Avatar from "../avatar/avatar.component";

const IconsGroup = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user: IUser | null = useAppSelector(
    (state: RootState) => state.user.currentUser
  );
  const isActivitiesOpen: boolean = useAppSelector(
    (state: RootState) => state.header.isActivitiesOpen
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
          <ActivityPopover
            isOpen={isActivitiesOpen}
            onOpen={() => dispatch(showActivities())}
            onClose={() => dispatch(hideActivities())}
          >
            <Box>
              <Icon
                as={isActivitiesOpen ? AiFillHeart : AiOutlineHeart}
                h={6}
                w={6}
                cursor="pointer"
              />
            </Box>
          </ActivityPopover>
          <Spacer />
          <Center w="1.7rem" h="1.7rem">
            <Link to={`/${user.username}/`}>
              <Avatar
                src={user.avatarUrl}
                borderWidth={
                  history.location.pathname === `/${user.username}/`
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
