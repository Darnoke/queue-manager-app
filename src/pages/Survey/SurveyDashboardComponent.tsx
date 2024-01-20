import { Route, Routes, useNavigate } from 'react-router-dom';
import SurveyStartComponent from './SurveyStartComponent';
import SurveyComponent from './SurveyComponent';
import SurveyFinishComponent from './SurveyFinishComponent';
import { useState } from 'react';

const SurveyDashboardComponent = () => {
  const [assignedNumber, setAssignedNumber] = useState<number>(-1);
  const [queueId, setQueueId] = useState<string>('');

  const navigate = useNavigate();

  const navigateToFinish = (assignedNumber: number, queueId: string) => {
    setQueueId(queueId);
    setAssignedNumber(assignedNumber);
    navigate('/survey/finish');
  }

  return (
    <div className="survey-container">
      <Routes>
        <Route path="/start/:queueId" element={<SurveyStartComponent />} />
        <Route path="/:queueId/:surveyId" element={<SurveyComponent navigateToFinish={navigateToFinish}/>} />
        <Route path="/finish" element={<SurveyFinishComponent assignedNumber={assignedNumber} queueId={queueId}/>} />
      </Routes>
    </div>
  );
};
  
export default SurveyDashboardComponent;