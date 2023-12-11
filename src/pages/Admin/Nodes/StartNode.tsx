import { memo } from "react";
import { Handle, Position } from "reactflow";

interface StartNodeParams {
    id: string
}

function StartNode({ id }: StartNodeParams) {
    return (
      <>
        <div className="start-node__body">
            <span>Start</span>
            <Handle type="source" position={Position.Right} id={id} />
        </div>
      </>
    );
  }
  
  export default memo(StartNode);
  