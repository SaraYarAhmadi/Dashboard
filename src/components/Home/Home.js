
import 'bootstrap/dist/css/bootstrap.css';
import "./Home.css";
import Features from './Features/Features';
import AdminsInfo from './AdminsInfo/AdminsInfo';
import Chart from './Features/FeaturesItem/Chart/Chart';
import { xAxisData } from '../../adminsdetails';


function Home() {

    return (
        <div className='home w-80' >
            <Features></Features>          
            <Chart grid title="فروش ماهانه" data={xAxisData} dataKey="Sale" />         
            <AdminsInfo/>
        </div>
    );
}

export default Home;