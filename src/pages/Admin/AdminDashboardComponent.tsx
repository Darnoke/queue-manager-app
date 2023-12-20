import { Route, Routes } from 'react-router-dom';
import AdminHeaderComponent from './AdminHeaderComponent';
import AdminUserTableComponent from './AdminUserTableComponent';
import AdminQueueEditComponent from './AdminQueueEditComponent';
import AdminQueuePlannerWrapComponent from './Nodes/AdminQueuePlannerWrapComponent';
const AdminDashboardComponent = () => {
  return (
    <div className="container">
      <AdminHeaderComponent/>
      <Routes>
        <Route path="/users" element={<AdminUserTableComponent />} />
        <Route path="/edit" element={<AdminQueueEditComponent />} />
        <Route path="/plan" element={<AdminQueuePlannerWrapComponent />} />
      </Routes>
    </div>
  );
};
  
export default AdminDashboardComponent;