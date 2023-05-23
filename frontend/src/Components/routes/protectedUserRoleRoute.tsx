import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from "../../redux/store";
import { selectUserState, userRole } from '../../redux/user-slice';

export const ProtectedUserRoleRoute = () => {
    const user = useAppSelector(selectUserState)
    return user && user.userRole === userRole.User ? <Outlet /> : <Navigate to={"/forbidden"} replace />
}
  