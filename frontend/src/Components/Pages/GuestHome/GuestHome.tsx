import "./GuestHome.css";
import VacationCard from "../../Cards/VacationCard/VacationCard";
import { useAppSelector } from "../../../redux/store";
import { selectVacationsState } from "../../../redux/vacation-slice";
import VacationsPage from "../VacationsPage/VacationsPage";

function GuestHome(): JSX.Element {
  const { vacationsList } = useAppSelector(selectVacationsState);

  const getCardProps = ()=>{
    return {};
  }

  return(
     <VacationsPage vacations={vacationsList} CardComponent={VacationCard} getCardProps={getCardProps} />
  ); 

}

export default GuestHome;
