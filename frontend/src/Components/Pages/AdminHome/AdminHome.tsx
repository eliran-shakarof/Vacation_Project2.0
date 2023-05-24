import "./AdminHome.css";
import AdminVacationCard from "../../Cards/AdminVacationCard/AdminVacationCard";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { deleteVacationAsync, selectVacationsState } from "../../../redux/vacation-slice";
import { Vacation } from "../../../Models/vacation";
import VacationsPage from "../VacationsPage/VacationsPage";

function AdminHome(): JSX.Element {
  const dispatch = useAppDispatch();
  const { vacationsList } = useAppSelector(selectVacationsState);

  const deleteVacation = (vacation_id: number, imageName: string) => {
    dispatch(
      deleteVacationAsync({ vacation_id: vacation_id, imageName: imageName })
    );
  };

  const getCardProps = (vacation: Vacation) => {
    return {
      deleteVacationFunction: ()=>{deleteVacation(vacation.vacation_id,vacation.imageName)},
    };
  };

  return (
    <div className="AdminHome">
      <NavLink to="/AddVacation">
        <Button sx={{ mb: 1 }} variant="outlined">
          Add new vacation
        </Button>
      </NavLink>

      <VacationsPage vacations={vacationsList} CardComponent={AdminVacationCard} getCardProps={getCardProps}/> 
    </div>
  );
}

export default AdminHome;
