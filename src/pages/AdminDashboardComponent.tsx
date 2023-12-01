import { Route, Routes } from 'react-router-dom';
import AdminHeaderComponent from './AdminHeaderComponent';
import AdminUserTable from './AdminUserTable';
const AdminDashboardComponent = () => {
  return (
    <div className="container">
      <AdminHeaderComponent/>
      <Routes>
        <Route path="/*" element={<AdminUserTable />} />
      </Routes>
    </div>
  );
};
  
export default AdminDashboardComponent;