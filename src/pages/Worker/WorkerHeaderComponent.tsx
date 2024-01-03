import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { Button } from "@mui/material";
import './WorkerHeaderStyles.scss';

const WorkerHeaderComponent = () => {
  const { logout } = useUser();

  return (
    <header className="worker-header">
      <span>
        Hello Worker
      </span>
      <nav>
        <Link to="/worker/">Queue List</Link>
      </nav>
      <Button onClick={logout} color="secondary">
        Logout
      </Button>
    </header>
  );
};
  
export default WorkerHeaderComponent;