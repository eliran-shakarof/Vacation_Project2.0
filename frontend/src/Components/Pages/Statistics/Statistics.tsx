import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import "./Statistics.css";
import { useAppSelector } from '../../../redux/store';
import Box from '@mui/material/Box';
import { selectVacationsState } from '../../../redux/vacation-slice';

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

function Statistics(): JSX.Element {
    const { vacationsList } = useAppSelector(selectVacationsState);

    const vacations = vacationsList.filter((item:any) => item.sumFollowers > 0);

    const data = {
        labels: vacations.map(vacation => vacation.destination),
        datasets: [{
          label: 'Vacations that have more interesting',
          data: vacations.map(vacation => vacation.sumFollowers),
          backgroundColor: [
            'rgb(153, 102, 255)'
          ],
          borderColor: [
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }],
        options: {  
          responsive: true,
          maintainAspectRatio: false
        }
      };

    return (
        <div className="Statistics">
          <div className="staticResolution">
            <Box sx={{py:5}}>
                <Bar data={data}/>
            </Box>
          </div>
        </div>
    );
}

export default Statistics;
