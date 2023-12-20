import { CategoryProvider } from "../../../contexts/CategoryContext";
import AdminQueuePlannerComponent from "./AdminQueuePlannerComponent";

const AdminQueuePlannerWrapComponent = () => {
  return (
    <CategoryProvider>
      <AdminQueuePlannerComponent />
    </CategoryProvider>
  );
};
  
export default AdminQueuePlannerWrapComponent;