import ReactFlow, { Background, Controls, MiniMap, useEdgesState, useNodesState } from "reactflow";
import AdminQueuePlannerSideComponent from "./AdminQueuePlannerSideComponent";
import './AdminQueuePlannerStyles.scss';
import 'reactflow/dist/style.css';

const AdminQueuePlannerComponent = () => {

  const initialNodes = [
    { id: '1', type: 'input', data: { label: 'Node' }, position: { x: -150, y: 0 } },
    { id: '2', type: 'input', data: { label: 'Node' }, position: { x: 150, y: 0 } },
    { id: '3', data: { label: 'Node' }, position: { x: 0, y: 100 } },
    { id: '4', data: { label: 'Node' }, position: { x: 0, y: 200 } },
    { id: '5', type: 'output', data: { label: 'Node' }, position: { x: 0, y: 300 } },
  ];
  
  const initialEdges = [
    { id: '1->3', source: '1', target: '3' },
    { id: '2->3', source: '2', target: '3' },
    { id: '3->4', source: '3', target: '4' },
    { id: '4->5', source: '4', target: '5' },
  ];

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