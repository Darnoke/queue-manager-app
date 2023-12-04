import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { Button } from "@mui/material";
import './AdminHeaderStyles.scss';

const AdminHeaderComponent = () => {

  
  const { logout } = useUser();

  return (
    <header className="admin-header">
      <span>
        Hello Admin
      </span>
      <nav>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/edit">Edit</Link>
        <Link to="/admin/plan">Plan</Link>
      </nav>
      <Button onClick={logout} color="secondary">
        Logout
      </Button>
    </header>
  );
};
  
export default AdminHeaderComponent;