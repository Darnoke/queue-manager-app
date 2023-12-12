import ReactFlow, { Background, Connection, Controls, EdgeChange, MiniMap, NodeChange, addEdge, useEdgesState, useNodesState } from "reactflow";
import { useCallback, useState } from "react";
import AdminQueuePlannerSideComponent from "./AdminQueuePlannerSideComponent";
import { nodes as initialNodes, edges as initialEdges } from './InitialElements.js';
import QuestionNode from "./QuestionNode.js";
import StartNode from "./StartNode.js";
import './AdminQueuePlannerStyles.scss';
import 'reactflow/dist/style.css';
import ConfirmationDialog from "../../../dialogs/ConfirmationDialog.js";

const nodeTypes = {
  question: QuestionNode,
  start: StartNode,
};

const AdminQueuePlannerComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [nodesToRemove, setNodesToRemove] = useState<NodeChange[]>([]);
  const [edgesToRemove, setEdgesToRemove] = useState<EdgeChange[]>([]);
  const [deleteFlag, setDeleteFlag] = useState<boolean>(false);

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmDialogMessage, setConfirmDialogMessage] = useState('');
  
  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), []);

  function handleNodesChange(changes: NodeChange[]) {
    const nextChanges = changes.reduce((acc, change) => {
      if (change.type === 'remove') {
        if (!deleteFlag) {
          setDeleteFlag(true);
          setTimeout(handleMultipleDeletes, 100);
        }

        setNodesToRemove((nodes) => [...nodes, change]);
        return acc;
      }

      return [...acc, change];
    }, [] as NodeChange[])

    onNodesChange(nextChanges);
  }

  function handleEdgeChange(changes: EdgeChange[]) {
    const nextChanges = changes.reduce((acc, change) => {
      if (change.type === 'remove') {
        if (!deleteFlag) {
          setDeleteFlag(true);
          setTimeout(handleMultipleDeletes, 100);
        }

        setEdgesToRemove((edges) => [...edges, change]);
        return acc;
      }

      return [...acc, change];
    }, [] as EdgeChange[])

    onEdgesChange(nextChanges)
  }

  function handleMultipleDeletes() {
    setConfirmDialogMessage('Do you want to remove all selected items?');
    setIsConfirmDialogOpen(true);
  }

  function deleteSelectedItems(answer: boolean) {
    if (answer) {
      onNodesChange(nodesToRemove);
      onEdgesChange(edgesToRemove);
    }
    setIsConfirmDialogOpen(false);
    setDeleteFlag(false);
    setNodesToRemove([]);
    setEdgesToRemove([]);
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
    <ConfirmationDialog open={isConfirmDialogOpen} onClose={(answer: boolean) => deleteSelectedItems(answer)} messageInput={confirmDialogMessage}/>
    </>
  );
};
  
export default AdminQueuePlannerComponent;