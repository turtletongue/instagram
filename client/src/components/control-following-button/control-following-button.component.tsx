import { useDisclosure } from "@chakra-ui/hooks";
import { IUser } from "../../redux/user/user.slice";
import FollowButton from "../follow-button/follow-button.component";
import UnfollowButton from "../unfollow-button/unfollow-button.component";
import UnfollowModal from "../unfollow-modal/unfollow-modal.component";

interface ControlFollowingButtonProps {
  isFollowed: boolean;
  user: IUser;
  [propName: string]: any;
}

const ControlFollowingButton = ({
  isFollowed,
  user,
  ...otherProps
}: ControlFollowingButtonProps) => {
  const {
    isOpen: isUnfollowModalOpen,
    onOpen: onUnfollowModalOpen,
    onClose: onUnfollowModalClose,
  } = useDisclosure();
  return (
    <>
      <UnfollowModal
        isOpen={isUnfollowModalOpen}
        onClose={onUnfollowModalClose}
        user={user}
      />
      {isFollowed ? (
        <UnfollowButton
          user={user}
          onUnfollowModalOpen={onUnfollowModalOpen}
          {...otherProps}
        />
      ) : (
        <FollowButton user={user} {...otherProps} />
      )}
    </>
  );
};

export default ControlFollowingButton;
