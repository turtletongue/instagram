import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, nextImage, setIsPending } from '../../redux/signin/signin.actions';
import { State } from '../../redux/store';
import SliderImage from '../slider-image/slider-image.component';

const MockupSlider = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchImages());
    const intervalId = setInterval(() => dispatch(nextImage()), 5000);
    return () => clearInterval(intervalId);
  }, [dispatch]);
  const currentImageId: number = useSelector((state: State) => state.signIn.currentImageId);
  const images: string[] = useSelector((state: State) => state.signIn.images);
  const finishLoading = () => setTimeout(() => dispatch(setIsPending(false)), 1000);
  return (
    <Box
      w="30rem"
      h="37rem"
      bgImage="url(https://www.instagram.com/static/images/homepage/home-phones@2x.png/9364675fb26a.png)"
      bgRepeat="no-repeat"
      bgPosition="center"
      bgSize="contain"
    >
      <Box
        m="5.94rem 0 0 10.47rem"
        position="relative"
      >
        {
          images.map((imageUrl: string, index: number) => {
            const previousIndex: number = (currentImageId - 1 >= 0) ?
              currentImageId - 1 : images.length - 1
            const isPrevious: boolean = index === previousIndex;
            const isVisible: boolean = index === currentImageId || isPrevious;
            return (
              <SliderImage
                key={index}
                imageUrl={imageUrl}
                visible={isVisible}
                previous={isPrevious}
                onLoad={() => finishLoading()}
                onError={() => finishLoading()}
              />
            );
          })
        }
      </Box>
    </Box>
  );
}

export default MockupSlider;