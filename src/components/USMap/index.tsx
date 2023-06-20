import {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';

import { stateMap, borderMap, otherMap } from '../../utils/data/stateMap';
import { StateDropdown } from '../Dropdown/StateDropdown';

const Main = styled.div`
    background-color: ${({ theme }) => theme.colors.gray};
    padding: 3em 0;

    .container{
        display: flex;
        flex-direction: column;
        align-items: center;
        /* gap: 2em; */
    }
    
    
    h2{
        line-height: 1;
        font-size: 3em;
        text-transform: uppercase;
    }
`;

const Title = styled.h2`
    line-height: 1;
    font-size: 6em;
    text-transform: uppercase;
    font-weight: 600;
    fontStyle: italic;
`;

interface SubtitleProps {
    $active?: boolean
}

const Subtitle = styled.h3<SubtitleProps>`
    line-height: 1;
    font-size: 2.5em;
    text-transform: uppercase;
    color: #6a9e3f;
    text-align: center;
    margin-bottom: 0.25em;
    
    text-decoration: ${({ $active }) => $active ? 'underline' : 'none'};
    
    @media (min-width: 768px) {
        font-size: 3em;
    }
    
`;
    
const USMapSVG = styled.svg`
    /* width: 320px; */
    width: 100%;
    max-width: 900px;
    
    path {fill: none; cursor: pointer}
    .borders {stroke:#FFFFFF; stroke-width:1}    /* color and width of borders between states */
    
    @media (min-width: 768px) {
    }
`;

const StatePaths = styled.g`
    path {
        fill: #507743;
        &:hover {
            fill: #6a9e3f;
            box-shadow: 5px 2px 10px #000;
            z-index: 1000;
        }
    }
`;

const Map = () => {
    const blankState = {name: '', id: ''};
    const [hoverState, setHoverState] = useState(blankState);
    const navigate = useNavigate();
    
    
    return (
        <>
            { hoverState.name && <Subtitle $active={true} onClick={() => navigate('/state/' + hoverState.id)}>{hoverState.name}</Subtitle> }
            
            { !hoverState.name && <Subtitle>Pick a state</Subtitle>}
        
            <USMapSVG 
            onMouseLeave={() => setHoverState(blankState)}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 959 593"
            >
                <StatePaths>
                    {stateMap.map((state) => (
                        <Link key={state.id} to={'state/' + state.id}>
                            <path 
                                onMouseEnter={() => setHoverState(state)}
                                onTouchStart={() => setHoverState(state)}
                                className={state.id} 
                                d={state.data} />
                        </Link>
                    ))}
                </StatePaths>
                
                <g className="borders">
                    {borderMap.map((state) => (
                        <path key={state.id} className={state.id} d={state.data} />
                    ))}
                </g>
                {otherMap.map((state) => (
                    <path key={state.id} className={state.id} d={state.data} />
                ))}
            </USMapSVG>
        </>
    )
}

export const USMap = () => {
    return (
        <Main>
            <div className="container">
                <Title>Where To?</Title>
                
                <Map/>
            
                {/* Dropdown is for mobile */}
                {/* Mobile Context? */}
                <div style={{margin: '2em 0 0', padding: '0 1em', width: '100%'}}>
                    <StateDropdown/>
                </div>
            
            </div>
        </Main>
    )
}