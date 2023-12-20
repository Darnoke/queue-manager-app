import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { memo, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { OpenWith } from '@mui/icons-material';
import { useCategoryContext } from "../../../contexts/CategoryContext";

interface EndNodeData {
  categoryId: string
}

interface EndNodeParams {
  id: string,
  data: EndNodeData
}

function EndNode({ id, data }: EndNodeParams) {
  const [category, setCategory] = useState<string>(data.categoryId);

  const { categories } = useCategoryContext();
  const { setNodes } = useReactFlow();

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);

    setNodes((prevNodes) => {
      const updatedNodes = prevNodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              categoryId: event.target.value,
            },
          };
        }

        return node;
      });

      return updatedNodes;
    });
  }

  return (
    <>
      <div className="end-node__body">
        <span>End</span>
        <Handle type="target" position={Position.Left} id={id} />
        <Select value={category} onChange={handleChange}>
          <MenuItem value={'empty'}>Select Category</MenuItem>
          {categories.map(category => (
            <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
          ))}
        </Select>
        <div className="buttons">
          <span className='custom-drag-handle'>
            <OpenWith/>
          </span>
        </div>
      </div>
    </>
  );
}

export default memo(EndNode);
  