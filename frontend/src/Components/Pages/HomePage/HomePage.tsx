import "./HomePage.css";
import { useAppSelector } from "../../../redux/store";
import GuestHome from "../GuestHome/GuestHome";
import { Box } from "@mui/material";
import AdminHome from "../AdminHome/AdminHome";
import UserHome from "../UserHome/UserHome";
import { selectUserState, userRole } from "../../../redux/user-slice";


function HomePage(): JSX.Element {
    const userState = useAppSelector(selectUserState); 
   
    return (
        <div className="HomePage">
            <Box>
                {
                    userState.userRole === userRole.Admin ? <AdminHome/> 
                    :
                    userState.userRole === userRole.User ? <UserHome/>
                    :
                    <GuestHome/>
                }
             </Box>

        </div>
    );
}

export default HomePage;
