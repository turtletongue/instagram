import * as React from 'react';
import { Flex } from '@chakra-ui/react';

interface CardContainerProps {
  children: React.ReactNode;
  [propName: string]: any;
}

const CardContainer = ({ children, ...otherProps }: CardContainerProps) => {
  return (
    <Flex
      direction="column"
      align="center"
      minW="22rem"
      bgColor="white"
      borderWidth="1px"
      p="1rem"
      zIndex="1"
      position="relative"
      left="-2rem"
      {...otherProps}
  >{ children }</Flex>
  );
}

export default CardContainer;