import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import emoji from "react-easy-emoji";

interface EmojiTextProps {
  children: ReactNode;
  [propName: string]: any;
}

const EmojiText = ({ children, ...otherProps }: EmojiTextProps) => {
  return (
    <Text {...otherProps} sx={{ img: { display: "inline" } }}>
      {emoji(children)}
    </Text>
  );
};

export default EmojiText;
