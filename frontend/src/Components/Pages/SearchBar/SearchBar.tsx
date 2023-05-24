import "./SearchBar.css";
import { TextField, InputAdornment } from "@mui/material";
import { ChangeEvent, useEffect, useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import { Vacation } from "../../../Models/vacation";


function SearchBar(props: any): JSX.Element {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        
        const results = props.vacationsList.filter((vacation: Vacation) =>
          vacation.destination.toLowerCase().includes(term.toLowerCase())
        );
      
        console.log(results)
        props.setSearchResults(results);
        props.setCurrentPage(1); 
      };
      
    return (
        <div className="SearchBar">
			 <TextField
                id="standard-search"
                label="Search field"
                type="search"
                variant="standard"
                value={searchTerm}
                onChange={handleChange}
                sx={{ width: 400 }}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                }}
            />
        </div>
    );
}

export default SearchBar;
