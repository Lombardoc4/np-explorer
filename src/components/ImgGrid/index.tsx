import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/utils/helper';

export const ImgGrid = ({
  images,
  loadMore,
}: {
  images: ImageProps[];
  loadMore?: boolean;
}) => {
  const { parkId } = useParams();
  const [open, setOpen] = useState(false);
  const imageCount = images.length >= 5 ? 5 : images.length >= 3 ? 3 : 1;

  const { data: additionalImages } = useQuery<ImageProps[]>({
    queryKey: ['assets', { parkCode: parkId }],
    queryFn: async () =>
      await fetcher(`multimedia/galleries/assets?parkCode=${parkId}`),
    enabled: loadMore === true,
  });

  return (
    <div
      className={clsx(
        'relative grid cursor-pointer grid-rows-[repeat(1,300px)] overflow-hidden rounded-lg border-2 shadow-lg md:grid-rows-[repeat(2,200px)] xl:grid-rows-[repeat(2,250px)]',
        imageCount === 5 && 'md:grid-cols-[2fr_1fr_1fr]',
        imageCount === 3 && 'md:grid-cols-[2fr_1fr]',
      )}
    >
      {images.slice(0, imageCount).map((img) => (
        <div
          key={img.url}
          className='overflow-hidden bg-cover bg-center bg-no-repeat not-first:hidden first:row-span-full md:not-first:block'
          style={{ backgroundImage: `url(${img.url})` }}
          onClick={() => setOpen(true)}
        />
      ))}
      {images.length > 1 && (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
          <DialogTrigger className='absolute bottom-4 left-4 cursor-pointer rounded bg-white px-3 py-1 text-xs text-black md:text-sm'>
            View all photos
          </DialogTrigger>
          <DialogContent className='md:bg-background w-full items-center justify-center border-0 bg-transparent px-16 pt-0 md:max-w-4xl md:border'>
            <ImageCarousel
              images={
                additionalImages ? [...images, ...additionalImages] : images
              }
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const ImageCarousel = ({ images }: { images: ImageProps[] }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    // TODO: FIX MOBILE LANDSCAPE
    <Carousel
      setApi={setApi}
      opts={{
        align: 'start',
        loop: true,
      }}
      className='w-full max-w-dvw px-4 sm:max-w-xl md:max-w-3xl md:px-0'
    >
      <div className='text-muted-foreground py-2 text-center text-sm'>
        Slide {current} of {count}
      </div>
      <CarouselContent className='items-center'>
        {images.map(
          (image, index) =>
            image.url && (
              <CarouselItem key={index}>
                <div className='overflow-hidden rounded-xl'>
                  <div className='flex max-h-[400px] items-center justify-center overflow-hidden md:max-h-[500px] landscape:max-h-[230px] landscape:md:max-h-[500px]'>
                    <img
                      className='h-full w-full object-contain landscape:w-auto'
                      src={image.url}
                      alt={image.title + ', ' + image.credit}
                    />
                  </div>
                  {/* <div
                      className='aspect-video bg-cover bg-center bg-no-repeat'
                      style={{ backgroundImage: `url(${image.url})` }}
                      /> */}
                  <div className='bg-primary text-primary-foreground w-full p-2 px-4 leading-5'>
                    <div className='grid grid-cols-2 items-center gap-2'>
                      <p>{image.title}</p>
                      <p className='text-right'>{image.credit}</p>
                    </div>
                    <hr className='my-1' />
                    <p className='text-sm'>{image.caption}</p>
                  </div>
                </div>
              </CarouselItem>
            ),
        )}
      </CarouselContent>
      <CarouselPrevious className='hidden sm:inline-flex' />
      <CarouselNext className='hidden sm:inline-flex' />
    </Carousel>
  );
};
