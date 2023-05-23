import { Routes, Route } from "react-router-dom";
import UserHome from "../../Pages/UserHome/UserHome";
import Login from "../../Pages/Login/Login";
import "./Main.css";
import AdminHome from "../../Pages/AdminHome/AdminHome";
import GuestHome from "../../Pages/GuestHome/GuestHome";
import Following from "../../Pages/Following/Following";
import Register from "../../Pages/Register/Register";
import AddVacation from "../../Pages/AddVacation/AddVacation";
import HomePage from "../../Pages/HomePage/HomePage";
import Page404 from "../../Pages/ErrorPages/Page404/Page404";
import Statistics from "../../Pages/Statistics/Statistics";
import { ProtectedAdminRoleRoute } from "../../routes/protectedAdminRoleRoute";
import { ProtectedUserRoleRoute } from "../../routes/protectedUserRoleRoute";
import Forbidden from "../../Pages/ErrorPages/Forbidden/Forbidden";

function Main(): JSX.Element {
    
    return (
        <div className="Main">
			<Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path="/Register" element={<Register/>}/>
                <Route path="/GuestHome" element={<GuestHome/>}/>
                
                <Route path="/" element={<ProtectedUserRoleRoute/>}>
                    <Route path="/UserHome" element={<UserHome/>}/>
                    <Route path="/Following" element={<Following/>}/>
                </Route> 
                
                <Route path="/" element={<ProtectedAdminRoleRoute />}>
                    <Route path="/AdminHome" element={<AdminHome/>}/>
                    <Route path="/AddVacation" element={<AddVacation/>}/>
                    <Route path="/Statistics" element={<Statistics/>}/>            
                </Route> 

                <Route path="/forbidden" element={<Forbidden/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>
    );
}

export default Main;
