import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { NodeType } from "../../../enums/NodeType";
import { useEffect, useState } from "react";
import { QueueList } from "../../../models/QueueList";
import { useUser } from "../../../contexts/UserContext";

type AddItemCallback = (nodeType: NodeType) => void;
interface QueuePlannerSideParams {
  addNode: AddItemCallback; 
  queueUpdate: (queueId: string) => void; 
  saveEvent: () => void; 
  queueId: string;
}

const AdminQueuePlannerSideComponent = ({ addNode, queueUpdate, saveEvent, queueId }: QueuePlannerSideParams ) => {
  const [queueData, setQueueData] = useState<QueueList[]>([]);

  const { axiosInstance } = useUser();

  const fetchQueueData = async () => {
    try {
      const response = await axiosInstance.get('/admin/queues');
      const data = await response.data;
      setQueueData(data);
    } catch (error: any) {
      console.error('Error fetching user data:', error.response.data);
    }
  }

  const handleQueueChange = (event: SelectChangeEvent<string>) => {
    const selectedQueueId = event.target.value;
    queueUpdate(selectedQueueId);
  };

  useEffect(() => {
    (async () => {
      await fetchQueueData();
    })();
  }, []);

  return (
    <div className="side-container">
      <FormControl fullWidth className='m-b-10'>
        <InputLabel id="queueSelectLabel">Select a Queue</InputLabel>
        <Select
          labelId="queueSelectLabel"
          id="queueSelect"
          value={queueId}
          label="Select a Queue"
          onChange={handleQueueChange}
        >
          <MenuItem value="">
            <em>Select a queue</em>
          </MenuItem>
          {queueData.map(queue => (
            <MenuItem key={queue._id} value={queue._id}>
              {queue.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {queueId && (<>
      <Button variant="contained" onClick={() => addNode(NodeType.Start)}>Add Start</Button>
      <Button variant="contained" onClick={() => addNode(NodeType.Question)}>Add Question</Button>
      <Button variant="contained" onClick={() => addNode(NodeType.End)}>Add End</Button>
      <Button variant="contained" onClick={() => saveEvent()} className="end-button">Save</Button>
      </>)}
    </div>
  );
};
  
export default AdminQueuePlannerSideComponent;