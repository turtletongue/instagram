import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  finishPageLoading,
  nextSlide,
  requestSliderImages,
} from "../../redux/signin/signin.slice";
import { RootState } from "../../redux/store";
import SliderImage from "../slider-image/slider-image.component";

const MockupSlider = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const testData = [
      "https://www.instagram.com/static/images/homepage/screenshot2.jpg/6f03eb85463c.jpg",
      "https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg",
      "https://www.instagram.com/static/images/homepage/screenshot3.jpg/f0c687aa6ec2.jpg",
      "https://www.instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg",
    ];
    dispatch(requestSliderImages({ testData }));
    const intervalId = setInterval(() => dispatch(nextSlide()), 5000);
    return () => clearInterval(intervalId);
  }, [dispatch]);
  const currentImageId: number = useAppSelector(
    (state: RootState) => state.signIn.currentSlideId
  );
  const images: string[] = useAppSelector(
    (state: RootState) => state.signIn.images
  );
  const finishLoading = () =>
    setTimeout(() => dispatch(finishPageLoading()), 1000);
  return (
    <Box
      w="30rem"
      h="37rem"
      bgImage="url(https://www.instagram.com/static/images/homepage/home-phones@2x.png/9364675fb26a.png)"
      bgRepeat="no-repeat"
      bgPosition="center"
      bgSize="contain"
    >
      <Box m="5.94rem 0 0 10.47rem" position="relative">
        {images.map((imageUrl: string, index: number) => {
          const previousIndex: number =
            currentImageId - 1 >= 0 ? currentImageId - 1 : images.length - 1;
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
        })}
      </Box>
    </Box>
  );
};

export default MockupSlider;
