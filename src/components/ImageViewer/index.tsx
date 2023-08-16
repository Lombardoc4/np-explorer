import { useEffect, useState } from "react";
import styled from "styled-components";

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
	closeAction: () => void
}

export const ImageViewer = ({
	previewImgs,
	parkId,
	closeAction
}: ImageViewerProps) => {
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
	: images[activeImage].url ? images[activeImage].url : ''

	return (
		<>
		<StyledImageViewer>

			<StyledImageContainer>
				<div className='img-container'>
					{/* Loading */}
					{loading && <div className='loading'>Loading...</div>}

					{/* No Images */}
					{!loading && images.length === 0 && <div className='loading'>No Images Found</div>}

					{/* Images */}
					{!loading && images.length > 0 && (<>

						<img
							src={imgSrc}
							alt={images[activeImage].altText}
							title={images[activeImage].title}
						/>

						{/* If credits give them */}
						{images[activeImage].credit && <div className='credits'>{images[activeImage].credit}</div>}

						{/* Image Previews */}
						{/* <div className='dots'>
							{images.map((image: any, i: number) => (
								<div
									key={image.id || image.title}
									className={"img-preview " + (i === activeImage ? "active" : "")}
									onClick={() => setActiveImage(i)}
								>
									<img
										src={image.fileInfo ? image.fileInfo.url : image.url}
										alt={image.altText}
										title={image.title}
									/>
								</div>
							))}
						</div> */}
					</>)}

				</div>
			</StyledImageContainer>

			<div className='key-hints'>Arrow keys to navigate, Esc to close</div>
			<div className='image-count'>{activeImage + 1}/{images.length}</div>

			<button onClick={closeAction} className='btn close-btn'>Close</button>


			{/* Prev / Next Photo Buttons */}
			<div
				className='prev'
				onClick={() => setActiveImage(decrement(activeImage, images.length))}
			>
				&lt;
			</div>
			<div
				className='next'
				onClick={() => setActiveImage(increment(activeImage, images.length))}
			>
				&gt;
			</div>
		</StyledImageViewer>
	</>
	);
};

const StyledImageContainer = styled.div`
    width: clamp(300px, 80%, 1200px);
	max-height: 75vh;
	display: flex;

	.loading {
		color: #fff;
		font-size: 2em;
	}

	.img-container{
		border-radius: ${({theme}) => theme.radius.sm};
		overflow: hidden;
		img {
			object-fit: contain;
		}
	}
`

const StyledImageViewer = styled.div`
	height: 100dvh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;


	.credits, .key-hints, .image-count, .close-btn {
		position: absolute;
		padding: 1em;
		background: rgba(255, 255, 255, 0.8);
		color: #000;
		border-radius: ${({theme}) => theme.radius.sm};
	}

	.credits {
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.key-hints {
		top: 2em;
		left: 50%;
		transform: translateX(-50%);
	}

	.image-count {
		bottom: 2em;
		right: 50%;
		transform: translateX(50%);
	}

	.key-hints {
		top: 2em;
		left: 50%;
		transform: translateX(-50%);
	}

	.close-btn {
		top: 2em;
		right: 2em;
	}

	.prev,
	.next {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 50px;
		height: 50px;
		background: rgba(255, 255, 255, 0.8);
		color: #000;
		border-radius: 50%;
		font-size: 1.5em;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		transition: background 0.3s ease-out;
		&:hover {
			background: rgba(255, 255, 255, 1);
		}
	}
	.prev {left: 1em;}
	.next {right: 1em;}

	.dots {
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		height: 100px;
		background: rgba(0, 0, 0, 0.8);
		/* border-top: 1px solid ${({ theme }) => theme.colors.grey}; */
		color: #fff;
		font-size: 0.75em;
		overflow-x: scroll;
		overflow-y: hidden;

		display: flex;
		justify-content: flex-start;
		align-items: center;

		.img-preview {
			flex: 1 0 100px;
			/* width: 100px; */
			height: 100%;
			margin: 0 0.5em;
			cursor: pointer;

			&.active {
				border: 1px solid #fff;
			}

			img {
				max-height: 100%;
				max-width: 100%;
				object-fit: contain;
			}
		}
	}

	/* .dots {
		display: none;
	}

	@media (min-width: 768px) {
		.dots {
			display: flex;
		}
	} */
`;
