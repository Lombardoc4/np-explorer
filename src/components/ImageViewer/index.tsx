import { useEffect, useState } from "react";
import styled from "styled-components";

// Increment and Decrement functions for switching images
const increment = (index: number, length: number) => {
	return index === length - 1 ? 0 : index + 1;
};
const decrement = (index: number, length: number) => {
	return index === 0 ? length - 1 : index - 1;
};

const ImageViewer = ({
	previewImgs,
	parkId,
	closeAction,
}: {
	previewImgs: any;
	parkId: string;
	closeAction: () => void;
}) => {
	const [activeImage, setActiveImage] = useState(0);
	const [images, setImages] = useState<any[]>(previewImgs);
	const [loading, setLoading] = useState(true);

	// Keyboard events for closing the modal and switching images
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			closeAction();
		}
		if (e.key === "ArrowRight") {
			setActiveImage(increment(activeImage, images.length));
		}
		if (e.key === "ArrowLeft") {
			setActiveImage(decrement(activeImage, images.length));
		}
	};

	// Event delegation for close action to prevent accidental closing
	const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
		const { id } = e.target as HTMLDivElement;
		if (id === "image-viewer") {
			closeAction();
		}
	};

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
	useEffect(() => {
		// TODO; scroll to active image
		
		// Add keyboard event listener for closing the modal and switching images
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			// Remove event listener on unmount
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [activeImage]);

	return (
		<StyledImageViewer
			id='image-viewer'
			onClick={handleClose}
		>
			{/* Loading */}
			{loading && <div className="loading">Loading...</div>}

			{/* No Images */}
			{!loading && images.length === 0 && <div className="loading">No Images Found</div>}

			{/* Images */}
			{!loading && images.length > 0 && (
				<>
					<div className='img-container'>
						{/* Image */}
						<img
							src={images[activeImage].fileInfo ? images[activeImage].fileInfo.url : images[activeImage].url}
							alt={images[activeImage].altText}
							title={images[activeImage].title}
						/>

						{/* If credits give them */}
						{images[activeImage].credit && <div className='credits'>{images[activeImage].credit}</div>}

						{/* Image Previews */}
						
						<div className='dots'>
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
						</div>
						
						
						<div className="key-hints">
								Arrow keys to navigate, Esc to close
							</div>
					</div>

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
				</>
			)}
		</StyledImageViewer>
	);
};

export const ImageGrid = ({ previewImgs, parkId }: { previewImgs: any; parkId: string }) => {
	const [open, setOpen] = useState(false);
	
	const toggleOpen = () => {
		setOpen(!open);
		document.body.classList.toggle('no-scroll');
	}

	return (
		<>
			{/* <ImgGrid onClick={() => setOpen(true)}> */}
					{previewImgs.slice(0, 1).map((image: any, i: number) => (
						<ImgContainer
							key={image.title}
							className="img-container"
							onClick={toggleOpen}
						>
							<img
								src={image.fileInfo ? image.fileInfo.url : image.url}
								alt={image.altText}
								title={image.title}
							/>
							<div className='credits'>{image.credit}</div>
							<div className='overlay'>
								{/* OnClick Open Modal Gallery */}
								<button>View Photos</button>
							</div>
						</ImgContainer>
					))}
			{/* </ImgGrid> */}
			{open && (
				<ImageViewer
					parkId={parkId}
					previewImgs={previewImgs}
					closeAction={toggleOpen}
				/>
			)}
		</>
	);
};


const ImgContainer = styled.div`
	/* padding: 1em; */
	/* background-color: ${({ theme }) => theme.colors.secondary}; */


		/* position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom 0; */
		
		/* border: 1px solid ${({ theme }) => theme.colors.black}; */
		/* border-radius: 5px; */
		width: 100%;
		height: 300px;
		/* max-height: 200px; */
		/* overflow: hidden; */

		@media (min-width: 768px) {
			/* min-width: 300px; */
			height: 400px
			/* max-width: 25%; */
			/* max-height: 250px; */
		}

	.overlay {
		opacity: 0;
		&:hover {
			opacity: 1;
			transition: opacity 0.3s ease-out;
		}
	}
`;

const StyledImageViewer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	cursor: pointer;
	background: rgba(0, 0, 0, 0.8);
	z-index: ${({ theme }) => theme.zIndex.overlay};

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
    
    .loading {
        color: #fff;
        font-size: 2em;
    }

	.img-container {
		position: relative;
		width: 300px;
		cursor: initial;
		background: #000;

		img {
			object-fit: contain;
		}
	}

	.credits {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 1em;
		background: rgba(0, 0, 0, 0.8);
		color: #fff;
		font-size: 0.75em;
	}
	
	.key-hints {
		position: absolute;
		top: 0;
		right: 0;
		transform: translateY(-100%);
		padding: 1em;
		background: rgba(0, 0, 0, 0.8);
		color: #fff;
		font-size: 0.75em;
	}

	.prev,
	.next {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 50px;
		height: 50px;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 50%;
		color: #000;
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

	.prev {
		left: 1em;
	}

	.next {
		right: 1em;
	}

	.dots {
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		height: 100px;
		/* padding: 1em; */
		background: rgba(0, 0, 0, 0.8);
		border-top: 1px solid ${({ theme }) => theme.colors.grey};
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

	.dots {
		display: none;
	}

	@media (min-width: 768px) {
		.img-container {
			max-height: 500px;
			width: 80%;
		}

		.dots {
			display: flex;
		}
	}
`;
