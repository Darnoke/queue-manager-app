import { Route, Routes } from "react-router-dom";
import WorkerHeaderComponent from "./WorkerHeaderComponent";
import WorkerQueueListComponent from "./WorkerQueueListComponent";
import WorkerQueueManagmentComponent from "./WorkerQueueManagmentComponent";
import './WorkerStyles.scss';

const WorkerDashboardComponent = () => {
    return (
      <div>
      <WorkerHeaderComponent/>
      <div className="worker-content">
        <Routes>
          <Route path="/:queueId" element={<WorkerQueueManagmentComponent />} />
          <Route path="/" element={<WorkerQueueListComponent />} />
        </Routes>
      </div>
    </div>
    );
  };
  
export default WorkerDashboardComponent;