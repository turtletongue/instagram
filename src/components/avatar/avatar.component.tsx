import { Image } from '@chakra-ui/react';

interface AvatarProps {
  src: string | null;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      src={src ? src : ""}
      h="1.4rem"
      w="1.4rem"
      borderRadius="5rem"
      borderWidth="1px"
      alt="User Avatar"
    />
  );
}

export default Avatar;