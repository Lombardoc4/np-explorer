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
            <StyledGrid $item={previewImages.length}>
                {previewImages.map((image: any) => (
                    <div key={image.url} className='img-container'  onClick={() => setModalOpen(true)}>
                        <img src={image.url} alt={image.altText} />
                    </div>
                ))}
                <div
                    onClick={() => setModalOpen(true)}
                    style={{
                        cursor: "pointer",
                        position: "absolute",
                        bottom: "1em",
                        left: "1em",
                        backgroundColor: "#fff",
                        padding: "0.25em 0.75em",
                        borderRadius: "0.5em",
                    }}
                >
                    View all photos
                </div>
            </StyledGrid>
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
