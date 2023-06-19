import { Link } from "react-router-dom"
import styled from 'styled-components';

const InfoBox = styled.div`
    /* width: 50%; */
    padding: 1em 0;
    
    p{ margin-bottom: 1em; }
    
    .fees {
        margin-bottom: 1em;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1em;
        
        
        h3 { grid-column: 1 / -1; }
        
        div {
            display: flex;
            flex-direction: column;
            align-items: center;
            
            padding: 1em;
            /* margin: 1em 0; */
            background-color: ${({ theme }) => theme.colors.accent};
            color: ${({ theme }) => theme.colors.white};
            border-radius: 5px;
            box-shadow: rgba(0, 0, 0, 0.26) 0px 2px 8px;
            text-align: center; 
            /* font-size: 1.2em; */
            
            .price {
                font-size: 1.25em;
                font-weight: bold;
            }
        }
        p { margin: 0; }
    }
`;


export const ParkDescription = ({ park }: any) => {
    return (
        <InfoBox>
            <h2>{park.fullName}</h2>
            <p>{park.description}</p>  
            <p>{park.weatherInfo}</p>
            
            {/* TODO: make into a grid some some sort not card but maybe borders between */}
            { park.entranceFees.length > 0 ?
            <div className="fees">
                <h3>Fees</h3>
                {park.entranceFees.map((fee: any) => (
                    <div key={fee.title}>
                        <p className="price">
                            ${fee.cost} {" "}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                            </svg>
                        </p>
                        <p>
                            {fee.title}
                        </p>
                        {/* <p>{fee.description}</p> */}
                    </div>
                ))}
            </div>
            :
            <div className="fees">
                <h3>No Fees</h3>
            </div>
            }
            
            
            <Link to={park.url}>Official National Parks Page</Link>
            
        </InfoBox>
    )
}