import { Navigate } from "react-router-dom"

const RedirectToAdmin = () => {
    return <Navigate to='/admin/users'/>
}

export default RedirectToAdmin;