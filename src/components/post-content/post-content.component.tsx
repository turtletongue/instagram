import { Image } from '@chakra-ui/react';

interface PostContentProps {
  imageUrl: string;
}

const PostContent = ({ imageUrl }: PostContentProps) => {
  return (
    <Image
      src={imageUrl}
      alt="Post Content."
      userSelect="none"
      draggable={false}
      w="100%"
    />
  );
}

export default PostContent;