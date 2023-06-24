import styled from 'styled-components';
import { Link } from 'react-router-dom';
import type * as CSS from 'csstype';
import { StyledContainer } from '../styled/StyledContainer';


// const StyledContainer = styled.div`
//   width: 100%;
//   max-width: 1280px;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   padding: 1em 0 0;
  
  
  
//   @media (min-width: 768px) {
//       flex-direction: row;
//       padding: 0;
//   }
// `;

const HeaderBox = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    /* height: 400px; */
    /* margin-bottom: 1rem; */

    .content{
        /* flex: 1; */
        max-width: 400px;
        margin: 0 auto;
        padding: 1.5em 1.5em 2.5em;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .children {
        flex: 2;
        max-height: 400px;
    }
    
    
    hr{
        width: 100%;
        margin: 0.75em 0;
    }
    
    @media (min-width: 768px) {
        flex-direction: row;
        
        .content {
            flex: 1;
            justify-content: center;
        }
        
        hr {
            margin: 1.25em 0;
        }
    }
`;


    

interface HeaderProps {
    children?: any,
    description: JSX.Element,
    style? : CSS.Properties
    subtitle?: {
        text: string,
        link: string
    },
    title: string,
}


export const Header = ({ title, description, subtitle, style, children  }: HeaderProps) => {
    return (
        <HeaderBox style={style}>
            {/* <StyledContainer $column={false}> */}
                {children  &&  <div className='children'> {children} </div> }
                <div className="content">
                    <h1 className={!subtitle ? 'state' : ''}>{title}</h1>
                    <hr/>
                    {subtitle &&
                    <h2>
                        <Link to={subtitle.link}>
                            {subtitle.text}
                        </Link>
                    </h2>
                    }
                    {description}
                </div>
            {/* </StyledContainer> */}
        </HeaderBox>
    )
}
