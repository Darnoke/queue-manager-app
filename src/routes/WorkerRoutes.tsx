import { Route, Routes } from "react-router-dom";
import WorkerDashboardComponent from "../pages/Worker/WorkerDashboardComponent";
import RedirectToWorker from "./RedirectToWorker";

const WorkerRoutes = () => {
    return (
        <Routes>
            <Route path="/worker/*" element={<WorkerDashboardComponent />} />
            <Route path="/login" element={<RedirectToWorker />} />
        </Routes>
    )
}

export default WorkerRoutes;