import { Button } from "@mui/material";
import { NodeType } from "../../../enums/NodeType";

type AddItemCallback = (nodeType: NodeType) => void;

const AdminQueuePlannerSideComponent = ({ addNode }: { addNode: AddItemCallback }) => {
    return (
      <div className="side-container">
        <Button variant="contained" onClick={() => addNode(NodeType.Start)}>Add Start</Button>
        <Button variant="contained" onClick={() => addNode(NodeType.Question)}>Add Question</Button>
        <Button variant="contained" onClick={() => addNode(NodeType.End)}>Add End</Button>
      </div>
    );
  };
  
export default AdminQueuePlannerSideComponent;