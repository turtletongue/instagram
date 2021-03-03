import { Text } from '@chakra-ui/react';

interface LogoProps {
  [propName: string]: any;
}

const Logo = (props: LogoProps) => {
  return (
    <Text
      userSelect="none"
      textAlign="center"
      fontFamily="Grand Hotel"
      color="#262626"
      {...props}
    >Instagram</Text>
  );
}

export default Logo;