import { Link } from "react-router-dom"
import logo from '/nps-base.svg'

import styled from 'styled-components';

const Nav = styled.nav`
    background-color: rgb(80, 119,67);
    padding: 1em 2em;
    
    .container{
        display: flex;
        gap: 1em;
        align-items: center;
    }
    
    /* .dropdown-search{ margin: 0 0 0 auto; } */
    
    a{color: #fff;}
    
    .logo{
        display: flex;
        align-items: center;
        gap: 0.5em;
        font-size: 1.5em;
    }
    
    a:not(.logo){
        background-color: #000;
        border-radius: 5px;
        padding: 0.5em 1em;
        font-weight: 700;
        box-shadow: rgba(0, 0, 0, 0.26) 0px 4px 16px;
        
        &:hover{
            /* background-color: #333; */
            /* border: inset 1px solid #fff; */
            box-shadow: rgb(255,255,255) 0 0 0 1px, rgba(255, 255, 255, 0.26) 0px 2px 8px;
        }
    }
`;
    

export const NavBar = ({children}: {children: JSX.Element}) => {
    return(
        <Nav>
            <div className="container">
                <Link to='/' className="logo">
                    <img src={logo} alt="Logo" />
                    Park Explorer
                </Link>
                
                {children}
                
                <Link to='/about' >
                    About
                </Link>
            </div>
        </Nav>
    )
}
