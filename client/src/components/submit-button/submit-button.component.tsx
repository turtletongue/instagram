import { Button } from "@chakra-ui/button";
import { Spinner } from "@chakra-ui/spinner";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

interface SubmitButtonProps {
  isActive: boolean;
  [propName: string]: any;
}

const SubmitButton = ({ isActive, ...otherProps }: SubmitButtonProps) => {
  const isLoading: boolean = useAppSelector(
    (state: RootState) =>
      state.profileEditPage.updateUserDataLoading === "loading"
  );
  return (
    <Button
      h="2rem"
      w="4rem"
      color="white"
      fontSize="sm"
      bgColor="#0095f6"
      opacity={isActive ? "" : 0.6}
      cursor={isActive ? "pointer" : "default"}
      sx={{
        "&:active": { opacity: 0.6 },
        "&:hover, &:active, &:focus": {
          boxShadow: "none",
          bgColor: "#0095f6",
        },
      }}
      {...otherProps}
    >
      {isLoading ? <Spinner color="white" size="sm" /> : "Submit"}
    </Button>
  );
};

export default SubmitButton;
