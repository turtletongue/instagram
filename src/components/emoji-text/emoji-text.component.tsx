import { ReactNode } from 'react';
import { Text } from '@chakra-ui/react';
import emoji from 'react-easy-emoji';

interface EmojiTextProps {
  children: ReactNode;
  [propName: string]: any;
}

const EmojiText = ({ children, ...otherProps }: EmojiTextProps) => {
  return (
    <Text {...otherProps} sx={{ display: 'flex', alignItems: 'center' }}>
      { emoji(children) }
    </Text>
  );
}

export default EmojiText;