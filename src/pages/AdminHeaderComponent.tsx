import { useUser } from "../contexts/UserContext";
import './AdminHeaderStyles.scss';

const AdminHeaderComponent = () => {

  
  const { logout } = useUser();

  return (
    <header>
      <h1>
        Hello Admin
      </h1>
      <nav>

      </nav>
      <button onClick={logout}>
        Logout
      </button>
    </header>
  );
};
  
export default AdminHeaderComponent;