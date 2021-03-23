import { Button } from "@chakra-ui/button";

interface SubmitButtonProps {
  isActive: boolean;
  [propName: string]: any;
}

const SubmitButton = ({ isActive, ...otherProps }: SubmitButtonProps) => {
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
      Submit
    </Button>
  );
};

export default SubmitButton;
