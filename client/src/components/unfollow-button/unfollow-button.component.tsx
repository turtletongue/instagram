import { useAppDispatch } from "../../redux/hooks";
import { setUnfollowModalUser } from "../../redux/user-page/user-page.slice";
import { IUser } from "../../redux/user/user.slice";
import BorderButton from "../border-button/border-button.component";

interface UnfollowButtonProps {
  onUnfollowModalOpen: () => void;
  user: IUser;
}

const UnfollowButton = ({ onUnfollowModalOpen, user }: UnfollowButtonProps) => {
  const dispatch = useAppDispatch();
  return (
    <BorderButton
      onClick={() => {
        dispatch(setUnfollowModalUser(user));
        onUnfollowModalOpen();
      }}
      bgColor="white"
      sx={{
        "&:hover, &:focus": {
          bgColor: "white",
          boxShadow: "none",
        },
        "&:active": {
          boxShadow: "none",
          opacity: 0.6,
        },
      }}
    >
      Following
    </BorderButton>
  );
};

export default UnfollowButton;
