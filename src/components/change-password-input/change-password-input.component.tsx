import { Input } from "@chakra-ui/input";

interface ChangePasswordInputProps {
  [propName: string]: any;
}

const ChangePasswordInput = ({ ...otherProps }: ChangePasswordInputProps) => {
  return (
    <Input
      type="password"
      bgColor="#fafafa"
      sx={{
        "&:active, &:focus": {
          boxShadow: "none",
          borderColor: "black",
        },
      }}
      {...otherProps}
    />
  );
};

export default ChangePasswordInput;
