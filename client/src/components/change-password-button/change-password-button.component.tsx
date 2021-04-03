import { Button } from "@chakra-ui/button";
import { Spinner } from "@chakra-ui/spinner";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

interface ChangePasswordButtonProps {
  isActive: boolean;
  [propName: string]: any;
}

const ChangePasswordButton = ({
  isActive,
  ...otherProps
}: ChangePasswordButtonProps) => {
  const isUpdatePasswordLoading: boolean = useAppSelector(
    (state: RootState) =>
      state.profileEditPage.updateUserPasswordLoading === "loading"
  );
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
      {isUpdatePasswordLoading ? (
        <Spinner color="white" size="sm" />
      ) : (
        "Change Password"
      )}
    </Button>
  );
};

export default ChangePasswordButton;
