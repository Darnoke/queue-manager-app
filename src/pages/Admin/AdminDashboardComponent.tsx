import { Route, Routes } from 'react-router-dom';
import AdminHeaderComponent from './AdminHeaderComponent';
import AdminUserTableComponent from './AdminUserTableComponent';
import AdminQueueEditComponent from './AdminQueueEditComponent';
import AdminQueuePlannerComponent from './Nodes/AdminQueuePlannerComponent';
const AdminDashboardComponent = () => {
  return (
    <div className="container">
      <AdminHeaderComponent/>
      <Routes>
        <Route path="/users" element={<AdminUserTableComponent />} />
        <Route path="/edit" element={<AdminQueueEditComponent />} />
        <Route path="/plan" element={<AdminQueuePlannerComponent />} />
      </Routes>
    </div>
  );
};
  
export default AdminDashboardComponent;