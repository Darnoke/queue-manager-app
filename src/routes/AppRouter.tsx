import { Route, Routes } from "react-router-dom";
import { useUser } from '../contexts/UserContext';
import LoginComponent from "../pages/LoginComponent";
import { UserRole } from "../enums/UserRole";
import RedirectToLogin from "./RedirectToLogin";
import WorkerDashboardComponent from "../pages/WorkerDashboardComponent";
import AdminRoutes from "./AdminRoutes";

const AppRouter = () => {

  const { user } = useUser();

  return (
    <Routes>
      { user?.role === UserRole.Admin ? (
        <Route path="/*" element={<AdminRoutes />} />
      ) : (
        <Route path="/admin/*" element={<RedirectToLogin />} />
      )}

      { user?.role === UserRole.Worker ? (
        <Route path="/worker" element={ <WorkerDashboardComponent/> }></Route>
      ) : (
        <Route path="/worker" element={<RedirectToLogin />} />
      )}
      { user?.role === UserRole.None &&
        <Route path="/login" element={<LoginComponent />}/>
      }
      <Route path="/" element={<RedirectToLogin />} />
    </Routes>
  );
};

export default AppRouter;