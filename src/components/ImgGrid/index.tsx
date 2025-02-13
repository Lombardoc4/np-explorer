import { Dispatch, useState } from 'react';
import { styled } from 'styled-components';
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
          'relative cursor-pointer grid-rows-[repeat(2,250px)] overflow-hidden rounded-lg border shadow-lg md:grid',
          sliceEnd === 5 && 'grid-cols-[2fr_1fr_1fr]',
          sliceEnd === 3 && 'grid-cols-[2fr_1fr]',
        )}
      >
        {previewImgs.slice(0, sliceEnd).map((img) => (
          <div
            key={img.url}
            className='overflow-hidden not-first:hidden first:row-span-full md:not-first:block'
            onClick={() => setModalOpen(true)}
          >
            <img
              src={img.url}
              alt={img.altText}
              onError={() => handleError(img.url || '')} // Hide image if loading fails
              className='h-full w-full object-cover'
            />
          </div>
        ))}
        <div
          onClick={() => setModalOpen(true)}
          className='absolute bottom-4 left-4 cursor-pointer rounded bg-white px-3 py-1 text-black'
        >
          View all photos
        </div>
      </div>
      {modal}
    </>
  );
};
