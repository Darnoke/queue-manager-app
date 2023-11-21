import { Navigate } from "react-router-dom"

const RedirectToLogin = () => {
    return <Navigate to='/login'/>
}

export default RedirectToLogin;