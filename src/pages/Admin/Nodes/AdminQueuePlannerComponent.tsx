import ReactFlow, { Background, Connection, Controls, EdgeChange, MiniMap, NodeChange, addEdge, useEdgesState, useNodesState } from "reactflow";
import { useCallback } from "react";
import AdminQueuePlannerSideComponent from "./AdminQueuePlannerSideComponent";
import { nodes as initialNodes, edges as initialEdges } from './InitialElements.js';
import QuestionNode from "./QuestionNode.js";
import StartNode from "./StartNode.js";
import './AdminQueuePlannerStyles.scss';
import 'reactflow/dist/style.css';

const nodeTypes = {
  question: QuestionNode,
  start: StartNode,
};

const AdminQueuePlannerComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);

  function handleNodesChange(changes: NodeChange[]) {
    const nextChanges = changes.reduce((acc, change) => {
      if (change.type === 'remove') {

        if (shouldNodeBeRemoved(change.id)) {
          return [...acc, change];
        }
 
        return acc;
      }

      return [...acc, change];
    }, [] as NodeChange[])

    onNodesChange(nextChanges);
  }

  function handleEdgeChange(changes: EdgeChange[]) {
    let confirmed = false;
    const nextChanges = changes.reduce((acc, change) => {
      if (change.type === 'remove') {

        if (confirmed || shouldEdgeBeRemoved(change.id)) {
          confirmed = true;
          return [...acc, change];
        }
 
        return acc;
      }

      return [...acc, change];
    }, [] as EdgeChange[])

    onEdgesChange(nextChanges)
  }

  const shouldNodeBeRemoved = (nodeId: string) => {
    return window.confirm("Delete node: " + nodeId + "?");
  }

  const shouldEdgeBeRemoved = (edgeId: string) => {
    return window.confirm("Delete edge: " + edgeId + "?");
  }

  return (
    <>
    <div className="admin-queue-planner-content">
      <AdminQueuePlannerSideComponent />
      <div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgeChange}
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
    </>
  );
};
  
export default AdminQueuePlannerComponent;