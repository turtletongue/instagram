import { Button } from "@chakra-ui/button";
import { Spinner } from "@chakra-ui/spinner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { follow } from "../../redux/user-page/user-page.slice";
import { IUser } from "../../redux/user/user.slice";

interface FollowButtonProps {
  user: IUser;
  [propName: string]: any;
}

const FollowButton = ({ user, ...otherProps }: FollowButtonProps) => {
  const dispatch = useAppDispatch();
  const token: string | null = localStorage.getItem("authToken");
  const isFollowLoading: boolean = useAppSelector(
    (state: RootState) => state.userPage.followLoading === "loading"
  );
  return (
    <Button
      onClick={() =>
        dispatch(follow({ input: { followingId: Number(user?.id), token } }))
      }
      ml="1rem"
      size="sm"
      bgColor="#0095f6"
      color="white"
      borderRadius="5px"
      sx={{
        "&:hover": {
          bgColor: "#0095f6",
        },
        "&:focus": {
          boxShadow: "none",
        },
        "&:active": {
          boxShadow: "none",
          opacity: 0.6,
        },
      }}
      {...otherProps}
    >
      {isFollowLoading ? <Spinner size="sm" color="white" /> : "Follow"}
    </Button>
  );
};

export default FollowButton;
