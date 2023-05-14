import "./Following.css";
import { useEffect, useState,ChangeEvent } from "react";
import axios from "axios";
import { Vacation } from "../../../Models/vacation";
import UserVacationCard from "../../Cards/UserVacationCard/UserVacationCard";
import { useNavigate,NavLink } from "react-router-dom";
import { Grid,Container,Button, Box, Pagination } from "@mui/material";
import notify from "../../../Utils/Notify";
import { store } from "../../../redux/store";
import { userRole } from "../../../redux/userState";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PaginationItem from "@mui/material/PaginationItem";
import Typography from "@mui/material/Typography";
import Urls from "../../../Utils/Urls";


const PER_PAGE = 6;

function Following(): JSX.Element {
    const [likeVacations, setLikeVacations] = useState<Vacation[]>([]);
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(0); 
    const pageCount = Math.ceil(likeVacations.length / PER_PAGE);
    const offset = currentPage * PER_PAGE;

    const [currUserRole, setCurrUserRole] = useState(store.getState().userState.userRole);
    
    store.subscribe(() => {
        setCurrUserRole(store.getState().userState.userRole);
      });

    useEffect(() => {
        const currUserName = store.getState().userState.userName;
        if (currUserRole !== userRole.User) {
          navigate("/")
        }

        try{
          axios.get(`${Urls.serverUrl}/following/all_for/${currUserName}`,{
            headers: {"authorization": `${store.getState().userState.userToken}`}
          })
          .then((response) => {setLikeVacations(response.data)})
        }catch(err){
          console.log(err);
        }
      }, [navigate,currUserRole]);

      const isLiked = (vacation_id: number):boolean =>{
        return likeVacations.filter(item => item.vacation_id === vacation_id).length > 0;
    }
    
    const handleChangePage = (event: ChangeEvent<unknown> | null, page: number): void => {
      setCurrentPage(page - 1);
    };

   const currentPageData = likeVacations.slice(offset, offset + PER_PAGE)
      .map((card) => (
        <Grid item key={card.vacation_id} xs={12} sm={6} md={4}>
            <UserVacationCard cardDetails={card} cardsLikes={isLiked(card.vacation_id)}/>
        </Grid>
      ))


    return (
        <div className="Following">
            <Typography variant="h6" component="div" sx={{ mb: 5 }} >
                  My Likes:
            </Typography>
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

export default Following;
