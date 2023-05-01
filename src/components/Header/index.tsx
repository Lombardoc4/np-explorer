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
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    
    
    min-height: 400px;
    
    /* margin-bottom: 1rem; */

    
    .content{
        max-width: 600px;
        margin: 0 auto;
        padding: 1.5em 1.5em 2.5em;
    }
    hr{
        margin: 1.25em 0;
    }
        /* h1{
            font-size: 2.5em;
            
            &.state{
                font-size: 3em;
            }
        }
        
        
        h2{ font-size: 2em;  }
        
        a{
            color: inherit;
            font-weight: 700;
            cursor: pointer;
            
            &:hover{
                text-decoration: underline;
                
            }
        }
        
        p{ font-size: 1.5em; font-style: italic;}
    } */
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
            <StyledContainer column={true}>
                <div className="content" style={{flex: 1}}>
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
                {children  &&  <div style={{flex: 2}}> {children} </div> }
            </StyledContainer>
        </HeaderBox>
    )
}
