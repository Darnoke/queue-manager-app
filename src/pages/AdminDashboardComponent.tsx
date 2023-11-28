import { Route, Routes } from 'react-router-dom';
import AdminHeaderComponent from './AdminHeaderComponent';
import ClientDashboardComponent from './ClientDashboardComponent';
const AdminDashboardComponent = () => {
  return (
    <div className="container">
      <AdminHeaderComponent/>
      <Routes>
        <Route path="/test" element={<ClientDashboardComponent />} />
      </Routes>
    </div>
  );
};
  
export default AdminDashboardComponent;