import ReactFlow, { Background, Connection, Controls, MiniMap, addEdge, useEdgesState, useNodesState } from "reactflow";
import { useCallback } from "react";
import AdminQueuePlannerSideComponent from "./AdminQueuePlannerSideComponent";
import { nodes as initialNodes, edges as initialEdges } from './Nodes/InitialElements.js';
import QuestionNode from "./Nodes/QuestionNode.js";
import './AdminQueuePlannerStyles.scss';
import 'reactflow/dist/style.css';

const nodeTypes = {
  question: QuestionNode,
};

const AdminQueuePlannerComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <div className="admin-queue-planner-content">
      <AdminQueuePlannerSideComponent/>
      <div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
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