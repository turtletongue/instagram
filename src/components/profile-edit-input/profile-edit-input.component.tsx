import { Input } from "@chakra-ui/input";

interface ProfileEditInputProps {
  [propName: string]: any;
}

const ProfileEditInput = ({ ...otherProps }: ProfileEditInputProps) => {
  return (
    <Input
      w="65%"
      h="2rem"
      borderRadius={3}
      borderColor="#adadad"
      sx={{
        "&:focus, &:active": {
          boxShadow: "none",
          outline: "-webkit-focus-ring-color auto 5px",
          borderColor: "black",
        },
      }}
      {...otherProps}
    />
  );
};

export default ProfileEditInput;
