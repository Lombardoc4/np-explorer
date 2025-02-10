import { Dispatch, useState } from "react";
import { styled } from "styled-components";
import { Modal } from "../Modal";
import { ImageViewer } from "../ImageViewer";
// import { Modal } from "../Modal";

interface ImgGridProps {
    images: {
        url: string;
        altText: string;
    }[];
}

const ImgModalStyles = {
    backgroundColor: "transparent",
    // width: 'clamp(300px, 80%, 1200px)',
};

const imgModal = (images: ImgGridProps): [JSX.Element, Dispatch<React.SetStateAction<boolean>>] => {
    const [isOpen, setIsOpen] = useState(false);
    const parkId = window.location.pathname.split("/")[2];

    const closeModal = () => {
        setIsOpen(false);
    };

    const modal = (
        <Modal
            isOpen={isOpen}
            closeAction={closeModal}
            styles={ImgModalStyles}
            overlayStyles={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        >
            <ImageViewer previewImgs={images.images} parkId={parkId} closeAction={closeModal} />
        </Modal>
    );

    return [modal, setIsOpen];
};

export const ImgGrid = ({ images }: ImgGridProps) => {
    const previewImages = images.slice(0, 5);
    const [modal, setModalOpen] = imgModal({ images: images });

    return (
        <>
            <div
                className='md:grid relative overflow-hidden rounded-lg cursor-pointer my-4 border shadow-lg'
                style={{
                    gridTemplateColumns: `2fr ${previewImages.length <= 2 ? "1fr" : "1fr 1fr"}`,
                    gridTemplateRows: `repeat(${previewImages.length <= 3 ? "1, 500px" : "2, 250px"})`,
                }}
            >
                {previewImages.map((image: any) => (
                    <div
                        key={image.url}
                        className='first:row-span-full overflow-hidden not-first:hidden md:not-first:block'
                        onClick={() => setModalOpen(true)}
                    >
                        <img className='h-full w-full object-cover' src={image.url} alt={image.altText} />
                    </div>
                ))}
                <div
                    onClick={() => setModalOpen(true)}
                    className='bg-white text-black absolute bottom-4 left-4 px-3 py-1 rounded cursor-pointer'
                >
                    View all photos
                </div>
            </div>
            {modal}
        </>
    );
};

interface StyledGridProps {
    $item: number;
}

const StyledGrid = styled.div<StyledGridProps>`
    display: grid;
    position: relative;

    grid-template-columns: 2fr ${({ $item }) => ($item <= 2 ? "1fr" : "1fr 1fr")};
    grid-template-rows: repeat(${({ $item }) => ($item <= 3 ? "1, 500px" : "2, 250px")});

    gap: 0.5em;
    overflow: hidden;
    border-radius: 1em;
    cursor: pointer;

    .img-container:nth-child(1) {
        grid-row: 1 / -1;
    }

    .img-container:nth-child(2) {
        grid-column: ${({ $item }) => $item === 4 && "2 / -1"};
    }
`;
