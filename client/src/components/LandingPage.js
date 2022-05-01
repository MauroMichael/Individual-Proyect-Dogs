import { Link } from 'react-router-dom';
import './LandingPage.css';


export default function LandingPage() {

    return (
        <div className = 'container'>
       
                    <div className = 'content'>
                        <h1 className = 'welcome'>Welcome to your Dogs Universe!!</h1>
                        <Link to = 'dogs'>
                            <button className = 'l-button' type = 'button'>Get Inside</button>
                        </Link>
                    </div>
        </div>
    )
}



 // style = {{
        //         backgroundImage: "url(/Lpage.jpg)",
        //         height: '510px',
        //         backgroundRepeat: 'no-repeat',
        //         backgroundSize: 'cover',
        //         }}>