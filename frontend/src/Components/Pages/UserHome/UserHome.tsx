import "./UserHome.css";
import UserVacationCard from "../../Cards/UserVacationCard/UserVacationCard";
import { useAppSelector } from "../../../redux/store";
import { selectVacationsState } from "../../../redux/vacation-slice";
import { selectFollowingState } from "../../../redux/following-slice";
import VacationsPage from "../VacationsPage/VacationsPage";
import { Vacation } from "../../../Models/vacation";

function UserHome(): JSX.Element {
  const { vacationsList } = useAppSelector(selectVacationsState);
  const { followingList } = useAppSelector(selectFollowingState);

  const isLiked = (vacation_id: number):boolean =>{
      return followingList.filter(item => item.vacation_id === vacation_id).length > 0;
  }

  const getCardProps = (vacation: Vacation)=>{
    return {
      isCardLike: isLiked(vacation.vacation_id)
    };
  }


return (
    <VacationsPage vacations={vacationsList} CardComponent={UserVacationCard} getCardProps={getCardProps}/> 
  );
}

export default UserHome;
