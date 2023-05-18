import "./HomePage.css";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../../redux/store";
import GuestHome from "../GuestHome/GuestHome";
import { Box } from "@mui/material";
import AdminHome from "../AdminHome/AdminHome";
import UserHome from "../UserHome/UserHome";
import { selectUserState, userRole } from "../../../redux/user-slice";


function HomePage(): JSX.Element {
    const userState = useAppSelector(selectUserState); 
    const [currUserRole, setCurrUserRole] = useState(userState.userRole);

    useEffect(()=>{
        setCurrUserRole(userState.userRole);
    },[userState])
    
    return (
        <div className="HomePage">
            <Box>
                {
                    currUserRole === userRole.Admin ? <AdminHome/> 
                    :
                    currUserRole === userRole.User ? <UserHome/>
                    :
                    <GuestHome/>
                }
             </Box>

        </div>
    );
}

export default HomePage;
