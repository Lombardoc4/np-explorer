import { Dispatch, useState } from 'react';
import { Modal } from '../Modal';
import { ImageViewer } from '../ImageViewer';
import clsx from 'clsx';
// import { Modal } from "../Modal";

const ImgModalStyles = {
  backgroundColor: 'transparent',
  // width: 'clamp(300px, 80%, 1200px)',
};

const imgModal = (
  images: ImageProps[],
): [React.ReactNode, Dispatch<React.SetStateAction<boolean>>] => {
  const [isOpen, setIsOpen] = useState(false);
  const parkId = window.location.pathname.split('/')[2];

  const closeModal = () => {
    setIsOpen(false);
  };

  const modal = (
    <Modal
      isOpen={isOpen}
      closeAction={closeModal}
      styles={ImgModalStyles}
      overlayStyles={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
    >
      <ImageViewer
        previewImgs={images}
        parkId={parkId}
        closeAction={closeModal}
      />
    </Modal>
  );

  return [modal, setIsOpen];
};

export const ImgGrid = ({ images }: { images: ImageProps[] }) => {
  const [previewImgs, setPreviewImages] = useState(images);
  const sliceEnd = images.length >= 5 ? 5 : images.length >= 3 ? 3 : 1;
  const [modal, setModalOpen] = imgModal(images);

  const handleError = (failedImage: string) => {
    setPreviewImages((prevImages) =>
      prevImages.filter((img) => img.url !== failedImage),
    );
  };

  return (
    <>
      <div
        className={clsx(
          'relative grid cursor-pointer grid-rows-[repeat(1,300px)] overflow-hidden rounded-lg border shadow-lg md:grid-rows-[repeat(2,200px)] 2xl:grid-rows-[repeat(2,300px)]',
          sliceEnd === 5 && 'md:grid-cols-[2fr_1fr_1fr]',
          sliceEnd === 3 && 'md:grid-cols-[2fr_1fr]',
        )}
      >
        {previewImgs.slice(0, sliceEnd).map((img) => (
          <div
            key={img.url}
            className='overflow-hidden bg-cover bg-center bg-no-repeat not-first:hidden first:row-span-full md:not-first:block'
            style={{ backgroundImage: `url(${img.url})` }}
            onClick={() => setModalOpen(true)}
          >
            {/* {!parallax &&<img
              src={img.url}
              alt={img.altText}
              onError={() => handleError(img.url || '')} // Hide image if loading fails
              className='h-full w-full object-cover'
            />} */}
          </div>
        ))}
        {previewImgs.length > 1 && (
          <div
            onClick={() => setModalOpen(true)}
            className='absolute bottom-4 left-4 cursor-pointer rounded bg-white px-3 py-1 text-xs text-black md:text-sm'
          >
            View all photos
          </div>
        )}
      </div>
      {modal}
    </>
  );
};
