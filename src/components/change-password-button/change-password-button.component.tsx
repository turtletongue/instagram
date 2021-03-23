import { Button } from "@chakra-ui/button";

interface ChangePasswordButtonProps {
  isActive: boolean;
  [propName: string]: any;
}

const ChangePasswordButton = ({
  isActive,
  ...otherProps
}: ChangePasswordButtonProps) => {
  return (
    <Button
      h="2rem"
      w="8rem"
      color="white"
      fontSize="sm"
      cursor={isActive ? "pointer" : "default"}
      opacity={isActive ? "" : 0.6}
      bgColor="#0095f6"
      sx={{
        "&:active": { opacity: 0.6 },
        "&:hover, &:active, &:focus": {
          boxShadow: "none",
          bgColor: "#0095f6",
        },
      }}
      {...otherProps}
    >
      Change Password
    </Button>
  );
};

export default ChangePasswordButton;
