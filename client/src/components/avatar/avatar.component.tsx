import { Circle, Image } from "@chakra-ui/react";

interface AvatarProps {
  src: string | null;
  [propName: string]: any;
}

const Avatar = ({ src, ...otherProps }: AvatarProps) => {
  return (
    <>
      {src ? (
        <Image
          src={src ? src : ""}
          h="1.5rem"
          w="1.5rem"
          p="0.09rem"
          borderRadius="5rem"
          alt="User Avatar"
          cursor="pointer"
          boxSizing="unset"
          userSelect="none"
          {...otherProps}
        />
      ) : (
        <Circle
          h="1.5rem"
          w="1.5rem"
          cursor="pointer"
          boxSizing="unset"
          p="0.09rem"
          bgColor="#929292"
        />
      )}
    </>
  );
};

export default Avatar;
