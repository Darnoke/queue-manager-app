import { Route, Routes } from "react-router-dom";
import AdminDashboardComponent from "../pages/Admin/AdminDashboardComponent";
import RedirectToAdmin from "./RedirectToAdmin";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/admin/*" element={<AdminDashboardComponent />} />
            <Route path="/login" element={<RedirectToAdmin />} />
        </Routes>
    )
}

export default AdminRoutes;