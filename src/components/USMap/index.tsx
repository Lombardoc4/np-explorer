import {  useState } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';

import { stateMap, borderMap, otherMap } from '../../utils/data/stateMap';

const Main = styled.div`
    background-color: #f1f1f1;
    /* margin-top: 3em; */
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

const Subtitle = styled.h3`
    line-height: 1;
    font-size: 3em;
    text-transform: uppercase;
    color: #6a9e3f;
`;
    
const USMapSVG = styled.svg`
    path {fill: none; cursor: pointer}
    .borders {stroke:#FFFFFF; stroke-width:1}    /* color and width of borders between states */
`;

const StatePaths = styled.g`
    path {
        fill: #507743;
        &:hover {
            fill: #6a9e3f;
        }
    }
`;

export const USMap = () => {
    const [hoverState, setHoverState] = useState('');
    return (
        <Main>
            <div className="container">
                <Title>Where To?</Title>
                <Subtitle>{hoverState || 'Pick a state'}</Subtitle>
                {/* Dropdown is for mobile */}
            {/* <div style={{margin: '1em 0', width: '100%'}}>
                <Dropdown
                    placeholder='Search for a state'
                    // options={allParks.map((park) => ({value: park.id, title: park.fullName}))}
                    options={stateMap.map((state) => ({value: state.id, title: state.name}))}
                    onSelect={(option) => handleStateSelect(option)}
                    />
            </div> */}
            <div>
                <USMapSVG 
                onMouseLeave={() => setHoverState('')}
                xmlns="http://www.w3.org/2000/svg" 
                width="959" 
                height="593"
                >
                    <StatePaths>
                        {stateMap.map((state) => (
                            <Link key={state.id} to={'state/' + state.id}>
                                <path 
                                    onMouseEnter={() => setHoverState(state.name)} 
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
            </div>
            
            </div>
        </Main>
    )
}