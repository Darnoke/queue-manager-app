import ReactFlow, { Background, Controls, MiniMap, useEdgesState, useNodesState } from "reactflow";
import AdminQueuePlannerSideComponent from "./AdminQueuePlannerSideComponent";
import './AdminQueuePlannerStyles.scss';
import 'reactflow/dist/style.css';

import { nodes as initialNodes, edges as initialEdges } from './Nodes/InitialElements.js';
import QuestionNode from "./Nodes/QuestionNode.js";

const nodeTypes = {
  question: QuestionNode,
};

const AdminQueuePlannerComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="admin-queue-planner-content">
      <AdminQueuePlannerSideComponent/>
      <div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        attributionPosition="bottom-right"
        nodeTypes={nodeTypes} 
      >
        <MiniMap zoomable pannable />
        <Controls />
        <Background color="#111" gap={16} />
      </ReactFlow>
      </div>
    </div>
  );
};
  
export default AdminQueuePlannerComponent;