import "./Following.css";
import { useState,ChangeEvent } from "react";
import UserVacationCard from "../../Cards/UserVacationCard/UserVacationCard";
import { Grid,Container, Box, Pagination } from "@mui/material";
import { useAppSelector } from "../../../redux/store";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PaginationItem from "@mui/material/PaginationItem";
import Typography from "@mui/material/Typography";
import { selectFollowingState } from "../../../redux/following-slice";

const PER_PAGE = 6;

function Following(): JSX.Element {
    const { followingList } = useAppSelector(selectFollowingState);

    const [currentPage, setCurrentPage] = useState(0); 
    const pageCount = Math.ceil(followingList.length / PER_PAGE);
    const offset = currentPage * PER_PAGE;
      
    const handleChangePage = (event: ChangeEvent<unknown> | null, page: number): void => {
      setCurrentPage(page - 1);
    };

   const currentPageData = followingList.slice(offset, offset + PER_PAGE)
      .map((card) => (
        <Grid item key={card.vacation_id} xs={12} sm={6} md={4}>
            <UserVacationCard cardDetails={{...card}} isCardLike={true}/>
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
