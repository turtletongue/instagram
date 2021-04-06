import { Flex, useMediaQuery } from "@chakra-ui/react";
import * as React from "react";

interface CardContainerProps {
  children: React.ReactNode;
  [propName: string]: any;
}

const CardContainer = ({ children, ...otherProps }: CardContainerProps) => {
  const [isLessThan825] = useMediaQuery("(max-width: 825px)");
  return (
    <Flex
      direction="column"
      align="center"
      minW={isLessThan825 ? "18rem" : "22rem"}
      bgColor="white"
      borderWidth="1px"
      p="1rem"
      zIndex="1"
      position="relative"
      left={isLessThan825 ? "0" : "-2rem"}
      {...otherProps}
    >
      {children}
    </Flex>
  );
};

export default CardContainer;
