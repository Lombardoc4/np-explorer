import { CardButtonGrid } from "../components/CardButtonGrid";
import { ParksDropdown } from "../components/Dropdown/ParksDropdown";
import { Header } from "../components/Header"
import { Icon } from "../components/Icon";
import styled from "styled-components";

const Container = styled.div`

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;


export const LandingPage = () => {
    
  
    const Description = (
        <>
            {/* <p>
                Find your favorite national park and start planning your next adventure!
            </p>
            <br/> */}
            <ParksDropdown/>
        </>
    );
    return (
        <>
        
        <Header
        style={{textAlign: 'center'}}
        title='National Parks Explorer'
        description={Description}>
            
            {/* Potential Image Slideshow */}
            
        </Header>
        
        <Container className="container">
            
            <div style={{flex: 1}}>
                <h2>About this page</h2>
                <p>Find things to do</p>
                <h2>First time park goes</h2>
                <p>Find things to do</p>
                <h2>Experienced park goes</h2>
                <p>Find things to do</p>
            </div>
            <div style={{flex: 1}}>
                <CardButtonGrid
                buttons={[
                    { name: 'Find a Park', id: '/park', icon: 'balloon' },
                    { name: 'Find a State', id: '/state', icon: 'balloon'  },
                    { name: 'Find an Activity', id: '/activity', icon: 'balloon'  },
                    { name: 'Find a State', id: '/state', icon: 'balloon'  },
                    { name: 'Find an Activity', id: '/activity', icon: 'balloon'  },
                ]}/> 
                {/* </div> */}
            </div>
        </Container>
        </>
        
    )
}
