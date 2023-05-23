import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from "../../redux/store";
import { selectUserState, userRole } from '../../redux/user-slice';

export const ProtectedAdminRoleRoute = () => {
    const user = useAppSelector(selectUserState)
    return user.userRole === userRole.Admin ? <Outlet /> : <Navigate to={"/forbidden"} replace />
}
  