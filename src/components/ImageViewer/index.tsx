import { useEffect, useState } from 'react';
import { MoveLeft, MoveRight, X } from 'lucide-react';

// Increment and Decrement functions for switching images
const increment = (index: number, length: number) => {
  return index === length - 1 ? 0 : index + 1;
};
const decrement = (index: number, length: number) => {
  return index === 0 ? length - 1 : index - 1;
};

interface ImageViewerProps {
  previewImgs: ImageProps[];
  parkId: string;
  closeAction: () => void;
}

export const ImageViewer = ({
  previewImgs,
  parkId,
  closeAction,
}: ImageViewerProps) => {
  const [activeImage, setActiveImage] = useState(0);
  const [images, setImages] = useState<ImageProps[]>(previewImgs);
  const [loading, setLoading] = useState(true);

  // Keyboard events for closing the modal and switching images
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      setActiveImage(increment(activeImage, images.length));
    }
    if (e.key === 'ArrowLeft') {
      setActiveImage(decrement(activeImage, images.length));
    }
  };

  useEffect(() => {
    // TODO; scroll to active image
    // Add keyboard event listener for closing the modal and switching images
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      // Remove event listener on unmount
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [loading, activeImage]);

  useEffect(() => {
    // fetch all images on load
    const fetchImages = async () => {
      const response = await fetch(
        `https://developer.nps.gov/api/v1/multimedia/galleries/assets?parkCode=${parkId}&api_key=${
          import.meta.env.VITE_NPS_API_KEY
        }`,
      );
      const data = await response.json();
      setImages([...images, ...data.data]);
      setLoading(false);
    };
    fetchImages();
  }, []);

  const imgSrc =
    images[activeImage].url || images[activeImage].fileInfo?.url || '';

  return (
    <>
      <div className='w-vw mx-auto flex h-dvh max-w-3xl flex-col items-center justify-center'>
        <div
          className='flex items-center gap-4 self-end rounded bg-white/80 px-3 py-2'
          onClick={closeAction}
        >
          <X />
        </div>

        <div className='max-h-[75vh] w-full'>
          <div className='overflow-hidden rounded-lg'>
            {/* Loading */}
            {loading && (
              <div className='object-container h-full w-full animate-pulse'>
                <div className='h-[75vh] w-full bg-gray-200'></div>
              </div>
            )}

            {/* No Images */}
            {!loading && images.length === 0 && (
              <div className='text-xl text-white'>No Images Found</div>
            )}

            {/* Images */}
            {!loading && images.length > 0 && (
              <>
                <img
                  className='object-contain'
                  src={imgSrc}
                  alt={images[activeImage].altText}
                  title={images[activeImage].title}
                />

                {/* If credits give them */}
                {images[activeImage].credit && (
                  <div className='w-full border bg-white/80 p-4 text-black'>
                    {images[activeImage].credit}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Prev / Next Photo Buttons */}
        <div className='my-4 flex w-full justify-center gap-8'>
          <div
            className='grid h-[50px] w-[50px] items-center justify-center rounded-full bg-white/80'
            onClick={() =>
              setActiveImage(decrement(activeImage, images.length))
            }
          >
            <MoveLeft />
          </div>
          <div className='grid h-[50px] w-[50px] items-center justify-center rounded-full bg-white/80'>
            {activeImage + 1}/{images.length}
          </div>
          <div
            className='grid h-[50px] w-[50px] items-center justify-center rounded-full bg-white/80'
            onClick={() =>
              setActiveImage(increment(activeImage, images.length))
            }
          >
            <MoveRight />
          </div>
        </div>
      </div>
    </>
  );
};
