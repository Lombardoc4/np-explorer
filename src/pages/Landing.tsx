import { ParksDropdown } from "../components/Dropdown/ParksDropdown";
import { Header } from "../components/Header"

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
            <div style={{flex: 2}}>
                
            <h1>Activity Search</h1>
            <div>
                {/* Lists of random activies */}
                <div className='activity'>
                    <h2>Activity 1</h2>
                    <p>Activity 1 description</p>
                </div>
                <div className='activity'>
                    <h2>Activity 2</h2>
                    <p>Activity 2 description</p>
                </div>
                <div className='activity'>
                    <h2>Activity 3</h2>
                    <p>Activity 3 description</p>
                </div>
                
            </div>
            </div>
            <div style={{flex: 1}}>
                <h2>Events</h2>
            </div>
        </div>
        </>
        
    )
}
