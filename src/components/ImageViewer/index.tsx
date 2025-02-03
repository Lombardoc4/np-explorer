import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../Button";
import { MoveLeft, MoveRight, X } from "lucide-react";

// Increment and Decrement functions for switching images
const increment = (index: number, length: number) => {
    return index === length - 1 ? 0 : index + 1;
};
const decrement = (index: number, length: number) => {
    return index === 0 ? length - 1 : index - 1;
};

interface ImageViewerProps {
    previewImgs: any;
    parkId: string;
    closeAction: () => void;
}

export const ImageViewer = ({ previewImgs, parkId, closeAction }: ImageViewerProps) => {
    const [activeImage, setActiveImage] = useState(0);
    const [images, setImages] = useState<any[]>(previewImgs);
    const [loading, setLoading] = useState(true);

    // Keyboard events for closing the modal and switching images
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") {
            setActiveImage(increment(activeImage, images.length));
        }
        if (e.key === "ArrowLeft") {
            setActiveImage(decrement(activeImage, images.length));
        }
    };

    useEffect(() => {
        // TODO; scroll to active image
        // Add keyboard event listener for closing the modal and switching images
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            // Remove event listener on unmount
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [loading, activeImage]);

    useEffect(() => {
        // fetch all images on load
        const fetchImages = async () => {
            const response = await fetch(
                `https://developer.nps.gov/api/v1/multimedia/galleries/assets?parkCode=${parkId}&api_key=${
                    import.meta.env.VITE_NPS_API_KEY
                }`
            );
            const data = await response.json();
            setImages([...images, ...data.data]);
            setLoading(false);
        };
        fetchImages();
    }, []);

    const imgSrc = images[activeImage].fileInfo
        ? images[activeImage].fileInfo.url
        : images[activeImage].url
        ? images[activeImage].url
        : "";

    return (
        <>
            <div className='h-dvh w-vw flex flex-col justify-center items-center max-w-3xl mx-auto'>
                <div className='flex self-end gap-4 items-center bg-white/80 px-3 py-2 rounded' onClick={closeAction}>
                    <X />
                </div>

                <div className='max-h-[75vh] w-full'>
                    <div className='rounded-lg overflow-hidden'>
                        {/* Loading */}
                        {loading &&
                            <div className='animate-pulse object-container w-full h-full'>
                                <div className='w-full h-[75vh] bg-gray-200'></div>
                            </div>
                        }

                        {/* No Images */}
                        {!loading && images.length === 0 && <div className='text-white text-xl'>No Images Found</div>}

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
                                    <div className='p-4 bg-white/80 text-black border w-full '>
                                        {images[activeImage].credit}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Prev / Next Photo Buttons */}
                <div className='flex justify-center gap-8 w-full my-4'>
                    <div
                        className='h-[50px] w-[50px]  bg-white/80 rounded-full grid items-center justify-center'
                        onClick={() => setActiveImage(decrement(activeImage, images.length))}
                    >
                        <MoveLeft />
                    </div>
                    <div className='h-[50px] w-[50px]  bg-white/80 rounded-full grid items-center justify-center'>
                        {activeImage + 1}/{images.length}
                    </div>
                    <div
                        className='h-[50px] w-[50px] bg-white/80 rounded-full grid items-center justify-center'
                        onClick={() => setActiveImage(increment(activeImage, images.length))}
                    >
                        <MoveRight />
                    </div>
                </div>
            </div>
        </>
    );
};