import { CardButtonGrid } from "../components/CardButtonGrid";
import { ParksDropdown } from "../components/Dropdown/ParksDropdown";
import { Header } from "../components/Header"
import { Icon } from "../components/Icon";

export const LandingPage = () => {

  
    const Description = (
        <>
            <p style={{width: '75%', margin: 'auto'}}>
                Find your favorite national park and start planning your next adventure!
            </p>
            <br/>
            <ParksDropdown/>
        </>
    );
    return (
        <>
        <Header
        style={{textAlign: 'center'}}
        title='National Parks Explorer'
        description={Description}/>
        
        <div className="container" style={{display: 'flex'}}>
            
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
        </div>
        </>
        
    )
}
