import { Image } from "@chakra-ui/react";

interface PostContentProps {
  imageUrl: string;
  [propName: string]: any;
}

const PostContent = ({ imageUrl, ...otherProps }: PostContentProps) => {
  return (
    <Image
      src={imageUrl}
      alt="Post Content."
      userSelect="none"
      draggable={false}
      w="100%"
      {...otherProps}
    />
  );
};

export default PostContent;
