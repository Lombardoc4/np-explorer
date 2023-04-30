import styled from 'styled-components';

const ImgGrid = styled.div`
    padding: 0 1em;
    background-color: #f1f1f1;
    
    .container{
        position: relative;
        display: flex;
        flex-wrap: no-wrap;
        overflow: hidden;
        gap: 0.5em;
    }
    
    .img-container{
        min-width: 300px;
        max-width: 25%;
        overflow: hidden;
        max-height: 250px;
    }
    
    .overlay{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.2);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity 0.3s 0.3s ease-out;
        opacity: 0;
        &:hover{
            opacity: 1;
            transition: opacity 0.3s ease-out;
            
        }
            
    }
`;

export const ImageGrid = ({ images }: any) => {
    return (
        <ImgGrid>
            <div className="container">
                {images.slice(0, 4).map((image: any, i: number) => (
                    <div key={image.title} className={"img-container " + "img" + (i + 1)}>
                        <img src={image.url} alt={image.altText} title={image.title} />
                        <div className="credits">
                            {image.credit}
                        </div>
                    </div>
                ))}
                <div className="overlay">
                    {/* OnClick Open Modal Gallery */}
                    <button>View More</button>
                </div>
            </div>
        </ImgGrid>
    )
}