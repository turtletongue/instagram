import { Image } from '@chakra-ui/react';

interface SliderImageProps {
  imageUrl: string;
  visible: boolean;
  previous: boolean;
  onLoad: Function;
  onError: Function;
}

const SliderImage = ({ imageUrl, visible, previous, onLoad, onError }: SliderImageProps) => {
  return (
    <Image
      visibility={ visible ? "visible" : "hidden" }
      opacity={ visible ? 1 : 0 }
      transition="opacity 1.5s ease-in"
      position="absolute"
      top="0"
      left="0"
      w="14.43rem"
      src={imageUrl}
      alt="Slider Image"
      zIndex={!previous ? 2 : 1}
      onLoad={() => onLoad()}
      onError={() => onError()}
    />
  );
}

export default SliderImage;