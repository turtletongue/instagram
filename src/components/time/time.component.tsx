import { Text } from "@chakra-ui/layout";

interface TimeProps {
  timeAgo: string | Date;
}

const Time = ({ timeAgo }: TimeProps) => {
  return (
    <Text
      fontWeight="400"
      color="#adadad"
      fontSize="0.6rem"
      mt="0.3rem"
      userSelect="none"
    >
      {timeAgo}
    </Text>
  );
};

export default Time;
