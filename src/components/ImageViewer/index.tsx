import styled from 'styled-components';

const ImgGrid = styled.div`
    padding: 1em;
    background-color: ${({ theme }) => theme.colors.secondary};
    position: relative;
    
    .container{
        position: relative;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        flex-wrap: no-wrap;
        overflow: hidden;
        gap: 1em;
        
        @media (min-width: 768px) {
            display: flex;
        }
    }
    
    .img-container{
        /* min-width: 300px; */
        border: 1px solid ${({ theme }) => theme.colors.black};
        border-radius: 5px;
        width: 100%;
        max-height: 200px;
        
        overflow: hidden;
        
        
        @media (min-width: 768px) {
            min-width: 300px;
            max-width: 25%;
            max-height: 250px;
        }  
    }
    
    .overlay{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
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
            </div>
            <div className="overlay">
                {/* OnClick Open Modal Gallery */}
                <button>View More</button>
            </div>
        </ImgGrid>
    )
}