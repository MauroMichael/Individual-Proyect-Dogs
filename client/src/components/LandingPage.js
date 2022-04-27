import { Link } from 'react-router-dom';


export default function LandingPage() {

    return (
        <div>
            <h1>Welcome to your Dogs Universe!!</h1>
            <Link to = 'dogs'>
                <button type = 'button'>Get Inside</button>
            </Link>
        </div>
    )
}