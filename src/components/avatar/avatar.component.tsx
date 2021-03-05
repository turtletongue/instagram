import { Image } from '@chakra-ui/react';

interface AvatarProps {
  src: string | null;
  [propName: string]: any;
}

const Avatar = ({ src, ...otherProps }: AvatarProps) => {
  return (
    <Image
      src={src ? src : ""}
      h="1.5rem"
      w="1.5rem"
      p="0.09rem"
      borderRadius="5rem"
      alt="User Avatar"
      cursor="pointer"
      boxSizing="unset"
      {...otherProps}
    />
  );
}

export default Avatar;