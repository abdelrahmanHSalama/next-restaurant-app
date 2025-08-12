'use client';
import { IProduct } from '@/services/types';
import { Carousel } from 'antd';
import Image from 'next/image';
import { HeartStraightIcon, StarIcon } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import { CustomArrow } from '../ui';

const ProductCard = ({ product }: { product: IProduct }) => {
  const t = useTranslations('Products');
  const { title, price, images, reviews } = product;
  return (
    <div className="flex flex-col bg-card rounded-xl shadow-xs">
      <Carousel
        arrows
        infinite
        dots={false}
        prevArrow={<CustomArrow direction="left" />}
        nextArrow={<CustomArrow direction="right" />}
      >
        {images.length > 0 &&
          images.map((img, idx) => (
            <Image key={idx} width={360} height={320} src={img} alt={title} />
          ))}
      </Carousel>
      <div className="p-4 md:p-6 flex flex-col gap-2 justify-between flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold leading-5">{title}</h3>
            <p className="text-primary font-bold">${price}</p>
          </div>
          <div className="flex items-center justify-center p-2 bg-input rounded-full cursor-pointer">
            <HeartStraightIcon className="size-6" />
          </div>
        </div>
        <p className="flex items-center gap-1 text-text/75">
          <StarIcon size={20} weight="fill" color="var(--c-warning)" />
          <StarIcon size={20} weight="fill" color="var(--c-warning)" />
          <StarIcon size={20} weight="fill" color="var(--c-warning)" />
          <StarIcon size={20} weight="fill" color="var(--c-warning)" />
          <StarIcon size={20} weight="fill" color="var(--c-border)" />({reviews.length})
        </p>
        <button className="bg-input cursor-pointer leading-7 w-fit font-bold px-6 py-1 rounded-xl mt-3">
          {t('editProduct')}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
