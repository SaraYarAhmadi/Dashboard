
import 'bootstrap/dist/css/bootstrap.css'
import "./Home.css"
import Features from './Features/Features';
import AdminsInfo from './AdminsInfo/AdminsInfo'

function Home() {

    return (
        <div className='home'>
            <Features></Features>
            <AdminsInfo></AdminsInfo>
        </div>
    );
}

export default Home;