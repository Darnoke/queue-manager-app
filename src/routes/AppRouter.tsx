import { Route, Routes } from "react-router-dom";
import { useUser } from '../contexts/UserContext';
import LoginComponent from "../pages/LoginComponent";
import { UserRole } from "../enums/UserRole";
import RedirectToLogin from "./RedirectToLogin";
import AdminRoutes from "./AdminRoutes";
import SurveyDashboardComponent from "../pages/Survey/SurveyDashboardComponent";
import WorkerRoutes from "./WorkerRoutes";
import WorkerWatchComponent from "../pages/Worker/WorkerWatchComponent";
import QueueWatchComponent from "../pages/Worker/QueueWatchComponent";

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
        <Route path="/*" element={ <WorkerRoutes/> }></Route>
      ) : (
        <Route path="/worker/*" element={<RedirectToLogin />} />
      )}
      { user?.role === UserRole.None &&
        <Route path="/login" element={<LoginComponent />}/>
      }
      <Route path="/survey/*" element={<SurveyDashboardComponent/>}/>
      <Route path="/watch/worker/:workerId" element={<WorkerWatchComponent/>}/>
      <Route path="/watch/queue/:queueId" element={<QueueWatchComponent/>}/>
      <Route path="/" element={<RedirectToLogin />} />
    </Routes>
  );
};

export default AppRouter;