import { styled } from "styled-components";

interface ImgGridProps {
    images: {
        url: string;
        altText: string;
    }[]
}

export const ImgGrid = ({ images }: ImgGridProps) => {

    const previewImages = images.slice(0, 5);

    return (
        <StyledGrid $item={previewImages.length}>
        {previewImages.map((image: any) => {
            return (
                <div key={image.url} className="img-container">
                    <img src={image.url} alt={image.altText} />
                </div>
            )
        })}
        </StyledGrid>
    )
}

interface StyledGridProps {
    $item: number;
}

const StyledGrid = styled.div<StyledGridProps>`
    display: grid;

    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: repeat(${({$item}) => $item <= 3 ? '1, 500px' : '2, 250px' });

    gap: 0.5em;
    overflow: hidden;
    border-radius: 1em;

    box-shadow: ${({theme}) => theme.boxShadow.far};
    background-color: transparent;

    .img-container {
        /* border-radius: 0 1em 0 1em; */
    }

    .img-container:nth-child(1) {
        grid-row: 1 / -1;
    }

    .img-container:nth-child(2) {
        grid-column: ${({$item}) => $item === 4 && '2 / -1' }
    }
`;
