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
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background: ${({ theme }) => theme.colors.black}; */
    color: ${({ theme }) => theme.colors.white};
    /* height: 400px; */
    /* margin-bottom: 1rem; */
    
    .container {
        padding: 1.5em 1.5em 2.5em;
        
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        
    }

    .content-bg{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;    
        background: linear-gradient( rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 100%);
        display: flex;
        align-items: flex-end;
        
        /* bottom: 2em; */
        /* left: 2em; */
        /* flex: 1; */
        /* width: 100%; */
        /* margin: 0 auto; */
    }
    
    .content {
        /* max-width: 400px; */
    }
    
    .children {
        flex: 2;
        max-height: 400px;
        width: 100%;
    }
    
    
    hr{
        width: 100%;
        margin: 0.75em 0;
    }
    
    @media (min-width: 768px) {
        flex-direction: row;
        
        h1 {
            font-size: 2.5em;
        }
        
        hr {
            margin: 1.25em 0;
        }
    }
`;


    

interface HeaderProps {
    children?: any,
    description?: JSX.Element,
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
                {/* <div className="content-bg"> */}
                    <div className="container">
                        <div className="content">
                            
                        {subtitle &&
                            <Link to={subtitle.link}>
                                {subtitle.text}
                            </Link>
                        }
                        <h1 className={!subtitle ? 'state' : ''}>{title}</h1>
                        <hr/>
                        {description}
                        </div>
                    </div>
                {/* </div> */}
            {/* </StyledContainer> */}
        </HeaderBox>
    )
}
