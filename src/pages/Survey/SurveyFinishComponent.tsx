import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SurveyFinishComponent = ({ assignedNumber, queueId }: {assignedNumber: number, queueId: string}) => {

  const navigate = useNavigate();

  const moveToStartPage = () => {
    navigate('/survey/start/' + queueId);
  }

  return (
    <div>
      <h2>Your number is {assignedNumber}</h2>
      <Button onClick={moveToStartPage}>Return to start page</Button>
    </div>
  );
};

export default SurveyFinishComponent;