import styled from 'styled-components';
import { Link } from 'react-router-dom';
import type * as CSS from 'csstype';


const HeaderBox = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    background: #000;
    color: #fff;
    margin-bottom: 1rem;
    
    .container{
        display: flex;
        justify-content: center;
    }
    
    .content{
        width: 50%;
        padding-right: 2em;
        margin: auto 0 1em 1em;
        
        h1{
            font-size: 2.5em;
            
            &.state{
                font-size: 3em;
            }
        }
        
        hr{
            margin: 1.25em 0 0.75em;
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
    }
`;
    

interface HeaderProps {
    title: string,
    description: JSX.Element,
    subtitle?: {
        text: string,
        link: string
    },
    style? : CSS.Properties
    children?: any,
}

export const Header = ({ title, description, subtitle, style, children  }: HeaderProps) => {
    return (
        <HeaderBox style={style}>
            <div className="container">
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
                {children}
            </div>
        </HeaderBox>
    )
}
