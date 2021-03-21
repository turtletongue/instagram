import { Button } from "@chakra-ui/button";
import { IUser } from "../../redux/user/user.slice";

interface FollowButtonProps {
  user: IUser;
  [propName: string]: any;
}

const FollowButton = ({ user, ...otherProps }: FollowButtonProps) => {
  return (
    <Button
      onClick={() => {}} // unfollow user
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
      Follow
    </Button>
  );
};

export default FollowButton;
