import "./VacationsPage.css";
import { useState,ChangeEvent, useEffect } from "react";
import { Grid,Container, Pagination, Box, PaginationItem } from "@mui/material";
import { useAppDispatch } from "../../../redux/store";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Vacation } from "../../../Models/vacation";
import SearchBar from "../SearchBar/SearchBar";

interface IHomeProps{
    vacations: any;   
    CardComponent: any;
    getCardProps: any;
}

const PER_PAGE = 6;

function VacationsPage(props: IHomeProps): JSX.Element {
  const dispatch = useAppDispatch();
  
  const [searchResults, setSearchResults] = useState<Vacation[]>(props.vacations)

  const [currentPage, setCurrentPage] = useState(1); 
  const pageCount = Math.ceil(searchResults.length / PER_PAGE);
  const offset = (currentPage - 1) * PER_PAGE;


  useEffect(() => {
    setSearchResults(props.vacations);
  }, [props.vacations]);


  const handleChangePage = (event: ChangeEvent<unknown> | null, page: number): void => {
    setCurrentPage(page);
  };

  const currentPageData = searchResults.slice(offset, offset + PER_PAGE)
      .map((card) => (
      <Grid item key={card.vacation_id} xs={12} sm={6} md={4}>
        <props.CardComponent {...props.getCardProps(card)} cardDetails={card}/>
      </Grid>
    ))

  return (
    <div className="VacationsPage">
      <SearchBar vacationsList={props.vacations} setSearchResults={setSearchResults} setCurrentPage={setCurrentPage}/><br/>

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

export default VacationsPage;
