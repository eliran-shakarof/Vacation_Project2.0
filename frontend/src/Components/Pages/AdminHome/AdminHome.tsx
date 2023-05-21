import "./AdminHome.css";
import AdminVacationCard from "../../Cards/AdminVacationCard/AdminVacationCard";
import { NavLink } from "react-router-dom";
import { useEffect, useState,ChangeEvent } from "react";
import {Button,Grid,Container, Pagination, Box, PaginationItem} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { selectUserState } from "../../../redux/user-slice";
import { deleteVacationAsync, selectVacationsState, vacationsListAsync } from "../../../redux/vacation-slice";

const PER_PAGE = 6;

function AdminHome(): JSX.Element {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUserState);
  const { vacationsList } = useAppSelector(selectVacationsState);

  const [currentPage, setCurrentPage] = useState(0); 
  const pageCount = Math.ceil(vacationsList.length / PER_PAGE);
  const offset = currentPage * PER_PAGE;

  useEffect(() => {   
    dispatch(vacationsListAsync());
  }, [userState.userRole,dispatch]);


  const deleteVacation = (vacation_id: number,imageName: string)=> {
      dispatch(deleteVacationAsync({vacation_id: vacation_id,imageName: imageName}));
  }

  const handleChangePage = (event: ChangeEvent<unknown> | null, page: number): void => {
    setCurrentPage(page - 1);
  };


  const currentPageData = vacationsList.slice(offset, offset + PER_PAGE)
      .map((card) => (
      <Grid item key={card.vacation_id} xs={12} sm={6} md={4}>
        <AdminVacationCard cardDetails={card} deleteVacationFunction={deleteVacation}/>
      </Grid>
    ))

  return (
    <div className="AdminHome">
      <NavLink to="/AddVacation">
        <Button sx={{ mb: 5 }} variant="outlined">Add new vacation</Button>
      </NavLink>
      
      <Container sx={{ py: 1 }} maxWidth="md">
        <Grid container spacing={5}>
          {currentPageData}
        </Grid>
      </Container>

      <Box>
        <Pagination
            className="myPagination"
            color="primary"
            sx={{ width: "fit-content" }}
            onChange={handleChangePage}
            count={pageCount}
            renderItem={(item) => (
                <PaginationItem
                    slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                    {...item}
                />
            )}
        />
      </Box>
    </div>
  );
}

export default AdminHome;
