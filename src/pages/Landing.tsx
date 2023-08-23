import { ParksDropdown } from "../components/Dropdown/ParksDropdown";
import { Header } from "../components/Header"
import styled from "styled-components";
import { USMap } from "../components/USMap";

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

export const LandingPage = () => {
    return (
        <>

            <Header
                title='National Parks Explorer'
                description={<ParksDropdown/>}>
            </Header>


            <USMap/>

            <Container className="container">
                <h1>COOL STUFF GOES HERE</h1>
                <div style={{flex: 1}}>
                    <h2>About this page</h2>
                    <p>Find things to do</p>
                    <h2>First time park goes</h2>
                    <p>Find things to do</p>
                    <h2>Experienced park goes</h2>
                    <p>Find things to do</p>
                </div>
                <div style={{flex: 1}}>
                    {/* <CardButtonGrid
                    buttons={[
                        { name: 'Find a Park', id: '/park', icon: 'balloon' },
                        { name: 'Find a State', id: '/state', icon: 'balloon'  },
                        { name: 'Find an Activity', id: '/activity', icon: 'balloon'  },
                        { name: 'Find a State', id: '/state', icon: 'balloon'  },
                        { name: 'Find an Activity', id: '/activity', icon: 'balloon'  },
                    ]}/> */}
                </div>
            </Container>

        </>
    )
}
