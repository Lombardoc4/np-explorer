import { useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  closeAction: () => void;
  children: JSX.Element;
  styles?: React.CSSProperties;
  overlayStyles?: React.CSSProperties;
}

export const Modal = ({
  isOpen,
  closeAction,
  overlayStyles,
  children,
}: ModalProps) => {
  const handleClose = (e: React.MouseEvent) => {
    const { id } = e.target as HTMLDivElement;
    if (id === 'modal-overlay') {
      closeAction();
    }
  };
  // Keyboard events for closing the modal and switching images
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeAction();
    }
  };

  useEffect(() => {
    if (isOpen) document.documentElement.classList.add('no-scroll');

    // TODO; scroll to active image
    // Add keyboard event listener for closing the modal and switching images
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      // Remove event listener on unmount
      window.removeEventListener('keydown', handleKeyDown);
      document.documentElement.classList.remove('no-scroll');
    };
  }, [isOpen]);

  if (!isOpen) {
    return <></>;
  }

  return (
    <div
      className='absolute inset-0 z-50 bg-black/30'
      onClick={handleClose}
      id='modal-overlay'
      style={{ ...overlayStyles }}
    >
      {/* <div style={{ ...styles }}> */}
      {children}
      {/* </div> */}
    </div>
  );
};
