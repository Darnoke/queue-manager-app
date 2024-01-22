import ReactFlow from "reactflow";
import QuestionNode from "../pages/Admin/Nodes/QuestionNode";
import StartNode from "../pages/Admin/Nodes/StartNode";
import EndNode from "../pages/Admin/Nodes/EndNode";
import { nodes, edges } from './InitialElements';
import { render, screen } from "@testing-library/react";

const nodeTypes = {
  question: QuestionNode,
  start: StartNode,
  end: EndNode
};

global.ResizeObserver = class ResizeObserver {
  cb: any;
  constructor(cb: any) {
    this.cb = cb;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('ReactFlow with custom nodes', () => {
  it('renders custom nodes correctly', () => {
    render(
      <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
    >
    </ReactFlow>);

    screen.debug();
    
    // Check for Start Node
    const startNode = screen.getByTestId('start-node');
    expect(startNode).toBeDefined();

    // Check for Question Node
    const questionNode = screen.getByTestId('question-node');
    expect(questionNode).toBeDefined();
  });
});