import { Button } from "@chakra-ui/button";

interface BorderButtonProps {
  children: any;
  [propName: string]: any;
}

const BorderButton = ({ children, ...otherProps }: BorderButtonProps) => {
  return (
    <Button
      ml="1rem"
      size="sm"
      fontWeight="500"
      bgColor="#fafafa"
      borderWidth="1px"
      borderColor="blackAlpha.400"
      sx={{
        "&:hover, &:focus": {
          bgColor: "#fafafa",
          boxShadow: "none",
        },
        "&:active": {
          boxShadow: "none",
          opacity: 0.6,
        },
      }}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export default BorderButton;
