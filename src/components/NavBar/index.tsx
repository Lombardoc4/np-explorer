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
`;
    

export const NavBar = ({children}: {children: JSX.Element}) => {
    return(
        <Nav>
            <div className="container">
                
                <div style={{flex: 1}}>
                    <Link to='/' className="logo">
                        <img src={logo} alt="Logo" />
                        Park Explorer
                    </Link>
                </div>
                
                
                <div style={{flex: 2}}>
                    {children}
                </div>
                
                <div style={{flex: 1, textAlign: 'right'}}>
                    <Link to='/about' >
                        <button>
                            About
                        </button>
                    </Link>
                </div>
            </div>
        </Nav>
    )
}
