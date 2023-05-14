import { Grid,Container, Pagination, PaginationItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./UserHome.css";
import { useEffect, useState,ChangeEvent } from "react";
import { userRole } from "../../../redux/userState";
import UserVacationCard from "../../Cards/UserVacationCard/UserVacationCard";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box } from "@mui/system";
import { selectUserState } from "../../../redux/user-slice";
import { selectVacationsState, vacationsListAsync } from "../../../redux/vacation-slice";
import { getFollowListAsync, selectFollowingState } from "../../../redux/following-slice";


const PER_PAGE = 6;

function UserHome(): JSX.Element {
   const dispatch = useAppDispatch();
   const userState = useAppSelector(selectUserState);
   const { vacationsList } = useAppSelector(selectVacationsState);
   const { followingList } = useAppSelector(selectFollowingState);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0); 
  const pageCount = Math.ceil(vacationsList.length / PER_PAGE);
  const offset = currentPage * PER_PAGE;
 
    useEffect(() => {
      if (userState.userRole !== userRole.User) {
        navigate("/")
      }

      dispatch(vacationsListAsync());
      dispatch(getFollowListAsync(userState.userName));

    }, [navigate,userState,dispatch]);


    const isLiked = (vacation_id: number):boolean =>{
        return followingList.filter(item => item.vacation_id === vacation_id).length > 0;
    }

   const currentPageData = vacationsList.slice(offset, offset + PER_PAGE)
      .map((card) => (
        <Grid item key={card.vacation_id} xs={12} sm={6} md={4}>
          <UserVacationCard cardDetails={{...card}} cardsLikes={isLiked(card.vacation_id)}/>
        </Grid>
      ))

    const handleChangePage = (event: ChangeEvent<unknown> | null, page: number): void => {
      setCurrentPage(page - 1);
    };

    console.log(vacationsList);
    console.log(followingList);
    return (
      <div className="UserHome">
        <Container sx={{ py: 5 }} maxWidth="md">
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

export default UserHome;
