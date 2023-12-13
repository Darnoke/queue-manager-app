import ReactFlow, { Background, Connection, Controls, EdgeChange, MiniMap, Node, NodeChange, Viewport, addEdge, useEdgesState, useNodesState, useViewport } from "reactflow";
import { useCallback, useState } from "react";
import AdminQueuePlannerSideComponent from "./AdminQueuePlannerSideComponent";
import { nodes as initialNodes, edges as initialEdges } from './InitialElements.js';
import QuestionNode from "./QuestionNode.js";
import StartNode from "./StartNode.js";
import './AdminQueuePlannerStyles.scss';
import 'reactflow/dist/style.css';
import ConfirmationDialog from "../../../dialogs/ConfirmationDialog.js";
import { NodeType } from "../../../enums/NodeType.js";
import EndNode from "./EndNode.js";

const nodeTypes = {
  question: QuestionNode,
  start: StartNode,
  end: EndNode
};

const AdminQueuePlannerComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [viewport, setViewport] = useState<Viewport>();

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

  function handleAddNode(nodeType: NodeType) {
    let createdNode: Node | undefined;
    
    switch(nodeType) {
      case NodeType.Question: {
        createdNode = {
          id: getNextFreeId(),
          type: 'question',
          position: { x: -(viewport?.x ?? 0), y: -(viewport?.y ?? 0) },
          dragHandle: '.custom-drag-handle',
          data: {
            question: "New question",
            answers: [
                {
                    id: 'ans-0',
                    answer: 'Answer 0'
                },
                {
                    id: 'ans-1',
                    answer: 'Answer 1'
                },
            ]
          },
        }
        break;
      }
      case NodeType.End: {
        createdNode = {
          id: getNextFreeId(),
          type: 'end',
          position: { x: -(viewport?.x ?? 0), y: -(viewport?.y ?? 0) },
          dragHandle: '.custom-drag-handle',
          data: {},
        }
        break;
      }
    }
    if (createdNode) addNode(createdNode);
  }

  function addNode(newNode: Node) {
    setNodes((nodes) => nodes.concat(newNode));
  }

  function getNextFreeId(): string {
    const usedIds = new Set(nodes.map((node) => node.id));

    let nextId = 1;
    while (usedIds.has(nextId.toString())) nextId++;

    return nextId.toString();
  }

  return (
    <>
    <div className="admin-queue-planner-content">
      <AdminQueuePlannerSideComponent addNode={handleAddNode}/>
      <div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgeChange}
          onConnect={onConnect}
          onMove={(event, viewport) => setViewport(viewport)}
          fitView
          minZoom={0.2}
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