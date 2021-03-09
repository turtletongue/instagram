import { Flex } from "@chakra-ui/layout";
import { ReactNode } from "react";

interface ModalItemProps {
  children: ReactNode;
  [propName: string]: any;
}

const ModalItem = ({ children, ...otherProps }: ModalItemProps) => {
  return (
    <Flex
      w="100%"
      h="3rem"
      bgColor="white"
      align="center"
      justify="center"
      cursor="pointer"
      sx={{ "&:active": { bgColor: "#fafafa" } }}
      {...otherProps}
    >
      {children}
    </Flex>
  );
};

export default ModalItem;
