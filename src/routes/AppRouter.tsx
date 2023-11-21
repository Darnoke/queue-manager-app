import { Route, Routes } from "react-router-dom";
import { useUser } from '../contexts/UserContext';
import LoginComponent from "../pages/LoginComponent";
import { UserRole } from "../enums/UserRole";
import RedirectToLogin from "./RedirectToLogin";

const AppRouter = () => {

  const { user } = useUser();

  return (
    <Routes>
      <Route path="/">hello</Route>
      { user?.role === UserRole.Admin ? (
        <Route path="/admin">Admin Dashboard</Route>
      ) : (
        <Route path="/admin" element={<RedirectToLogin />} />
      )}

      { user?.role === UserRole.Client ? (
        <Route path="/client">Client Dashboard</Route>
      ) : (
        <Route path="/client" element={<RedirectToLogin />} />
      )}
      { user?.role === UserRole.None &&
        <Route path="/login" element={<LoginComponent />}/>
      }
    </Routes>
  );
};

export default AppRouter;