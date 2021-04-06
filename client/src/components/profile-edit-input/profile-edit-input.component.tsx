import { Input } from "@chakra-ui/input";
import { useMediaQuery } from "@chakra-ui/media-query";

interface ProfileEditInputProps {
  [propName: string]: any;
}

const ProfileEditInput = ({ ...otherProps }: ProfileEditInputProps) => {
  const [isLessThan820] = useMediaQuery("(max-width: 820px)");
  return (
    <Input
      w={isLessThan820 ? "100%" : "65%"}
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
