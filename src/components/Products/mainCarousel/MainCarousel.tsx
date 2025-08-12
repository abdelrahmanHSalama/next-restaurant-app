import { Carousel } from 'antd';
import CarouselSlide from './CarouselSlide';
import { CustomArrow } from '@/components/ui';

const MainCarousel = () => {
  return (
    <Carousel
      arrows
      infinite
      dots={false}
      prevArrow={<CustomArrow direction="left" />}
      nextArrow={<CustomArrow direction="right" />}
    >
      <CarouselSlide />
      <CarouselSlide />
    </Carousel>
  );
};

export default MainCarousel;
