import { Button } from "@mui/material";
import { useUser } from "../../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const SurveyStartComponent = () => {

  const { axiosInstance } = useUser();
  const { queueId } = useParams();
  const navigate = useNavigate();

  const createSurvey = async () => {
    try {
      const response = await axiosInstance.post('/client/survey/' + queueId);
      const data = await response.data;
      const surveyId = data.surveyId;
      navigate(`/survey/${queueId}/${surveyId}`);
    } catch (error: any) {
      console.error('Error creating survey:', error.response.data);
    }
  }

  return (
    <Button variant="contained" onClick={createSurvey} className="start-button">Start Survey</Button>
  );
};

export default SurveyStartComponent;