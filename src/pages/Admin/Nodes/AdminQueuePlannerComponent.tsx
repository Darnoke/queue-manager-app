import ReactFlow, { Background, Connection, Controls, EdgeChange, MiniMap, Node, NodeChange, Viewport, addEdge, useEdgesState, useNodesState } from "reactflow";
import { useCallback, useState } from "react";
import AdminQueuePlannerSideComponent from "./AdminQueuePlannerSideComponent";
import QuestionNode from "./QuestionNode.js";
import StartNode from "./StartNode.js";
import './AdminQueuePlannerStyles.scss';
import 'reactflow/dist/style.css';
import ConfirmationDialog from "../../../dialogs/ConfirmationDialog.js";
import { NodeType } from "../../../enums/NodeType.js";
import EndNode from "./EndNode.js";
import { useUser } from "../../../contexts/UserContext.js";
import { useCategoryContext } from "../../../contexts/CategoryContext.js";

const nodeTypes = {
  question: QuestionNode,
  start: StartNode,
  end: EndNode
};

const AdminQueuePlannerComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [viewport, setViewport] = useState<Viewport>();

  const [nodesToRemove, setNodesToRemove] = useState<NodeChange[]>([]);
  const [edgesToRemove, setEdgesToRemove] = useState<EdgeChange[]>([]);
  const [deleteFlag, setDeleteFlag] = useState<boolean>(false);

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmDialogMessage, setConfirmDialogMessage] = useState('');

  const [selectedQueueId, setSelectedQeueuId] = useState<string>('');
  
  const {axiosInstance} = useUser();
  const { updateCategories } = useCategoryContext();

  const onConnect = useCallback((params: Connection) => { // remove old edge and add new one
    const sourceId = params.source;
    const targetId = params.target;
  
    const sourceNode = nodes.find(node => node.id === sourceId);
    const targetNode = nodes.find(node => node.id === targetId);
  
    // If the source node is 'start' and the target node is 'end', don't add the edge
    if (sourceNode?.type === 'start' && targetNode?.type === 'end') {
      return;
    }

    if (params.sourceHandle === sourceId) { // non question block
      const oldEdge = edges.find(edge => edge.source === sourceId);
  
      if (oldEdge) {
        setEdges(edges => edges.filter(edge => edge !== oldEdge));
      } 
    } else { // question block
      const handleId = params.sourceHandle;
      const oldEdge = edges.find(edge => edge.source === sourceId && edge.sourceHandle === handleId);

      if (oldEdge) {
        setEdges(edges => edges.filter(edge => edge !== oldEdge));
      } 
    }
    setEdges(eds => addEdge(params, eds));
  }, [edges]);

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
          data: {
            categoryId: 'empty',
          },
        }
        break;
      }
      case NodeType.Start: {
        const startAlreadyCreated = nodes.some(node => node.type === 'start');
        if (startAlreadyCreated) break;
        createdNode = {
          id: getNextFreeId(),
          type: 'start',
          position: { x: -(viewport?.x ?? 0) - 400, y: -(viewport?.y ?? 0) - 400 },
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

  async function handleQueueUpdate(queueId: string) {
    setSelectedQeueuId(queueId);
    try {
      const response = await axiosInstance.get('/admin/queues/' + queueId + '/survey'); 
      setNodes(response.data.survey.nodes);
      setEdges(response.data.survey.edges);
      updateCategories(response.data.availableCategories);
    } catch (error: any) {
      console.error('Error while fetching survey data', error.response.data);
    }
    
  }

  async function handleSave() {
    if (!selectedQueueId) return;
    const survey = { nodes, edges }
    try {
      await axiosInstance.put('/admin/queues/' + selectedQueueId + '/survey', { survey }); 
    } catch (error: any) {
      console.error('Error while saving survey data', error.response.data);
    }
  }

  return (
    <>
    <div className="admin-queue-planner-content">
      <AdminQueuePlannerSideComponent addNode={handleAddNode} queueUpdate={handleQueueUpdate} saveEvent={handleSave} queueId={selectedQueueId}/>
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