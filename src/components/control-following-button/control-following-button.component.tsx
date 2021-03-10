import { Button } from "@chakra-ui/button";
import FollowedIcon from "../followed-icon/followed-icon.component";

interface ControlFollowingButtonProps {
  isFollowed: boolean;
}

const ControlFollowingButton = ({
  isFollowed,
}: ControlFollowingButtonProps) => {
  return (
    <Button
      leftIcon={isFollowed ? <FollowedIcon /> : undefined}
      ml="1rem"
      size="sm"
      bgColor={isFollowed ? "#fafafa" : "#0095f6"}
      color={isFollowed ? "black" : "white"}
      borderWidth={isFollowed ? "1px" : "0"}
      borderColor="blackAlpha.600"
      borderRadius="5px"
      sx={{
        "&:hover": {
          bgColor: isFollowed ? "#fafafa" : "#0095f6",
        },
        "&:focus": {
          boxShadow: "none",
        },
        "&:active": {
          boxShadow: "none",
          opacity: 0.6,
        },
      }}
    >
      {isFollowed ? "" : "Follow"}
    </Button>
  );
};

export default ControlFollowingButton;
