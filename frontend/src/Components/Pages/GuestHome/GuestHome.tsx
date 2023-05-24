import "./GuestHome.css";
import { Container,Grid, Pagination, PaginationItem } from "@mui/material";
import { useEffect, useState,ChangeEvent } from "react";
import VacationCard from "../../Cards/VacationCard/VacationCard";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box } from "@mui/system";
import { useAppSelector } from "../../../redux/store";
import { selectVacationsState } from "../../../redux/vacation-slice";
import SearchBar from "../SearchBar/SearchBar";
import { Vacation } from "../../../Models/vacation";

const PER_PAGE = 6;

function GuestHome(): JSX.Element {
  const { vacationsList } = useAppSelector(selectVacationsState);
  const [searchResults, setSearchResults] = useState<Vacation[]>(vacationsList)

  const [currentPage, setCurrentPage] = useState(0); 
  const pageCount = Math.ceil(searchResults.length / PER_PAGE);
  const offset = currentPage * PER_PAGE;

  useEffect(() => {
    setSearchResults(vacationsList);
  }, [vacationsList]);
   
    const handleChangePage = (event: ChangeEvent<unknown> | null, page: number): void => {
      setCurrentPage(page - 1);
    };

   const currentPageData = searchResults.slice(offset, offset + PER_PAGE)
     .map((card) => (
        <Grid item key={card.vacation_id} xs={12} sm={6} md={4}>
          <VacationCard cardDetails={card}/>
        </Grid>
    ))


  return (
    <div className="GuestHome"> 
      <SearchBar vacationsList={vacationsList} setSearchResults={setSearchResults}/>
      
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

export default GuestHome;
