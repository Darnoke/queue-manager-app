import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { memo, useState } from "react";
import { Handle, Position } from "reactflow";
import { OpenWith, Add } from '@mui/icons-material';

interface EndNodeParams {
    id: string
}

function EndNode({ id }: EndNodeParams) {
    const [type, setType] = useState('1');

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    }

    return (
      <>
        <div className="end-node__body">
            <span>End</span>
            <Handle type="target" position={Position.Left} id={id} />
            <Select value={type} onChange={handleChange}>
                <MenuItem value={'1'}>TV</MenuItem>
                <MenuItem value={'2'}>PC</MenuItem>
                <MenuItem value={'3'}>Printer</MenuItem>
                <MenuItem value={'4'}>Phone</MenuItem>
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
  