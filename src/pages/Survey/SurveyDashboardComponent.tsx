import { Route, Routes, useNavigate } from 'react-router-dom';
import SurveyStartComponent from './SurveyStartComponent';
import SurveyComponent from './SurveyComponent';
import SurveyFinishComponent from './SurveyFinishComponent';
import { useState } from 'react';

const SurveyDashboardComponent = () => {
  const [assignedNumber, setAssignedNumber] = useState<number>(-1);

  const navigate = useNavigate();

  const navigateToFinish = (assignedNumber: number) => {
    console.log('navigateToFinish', assignedNumber);
    setAssignedNumber(assignedNumber);
    navigate('/survey/finish');
  }

  return (
    <div className="survey-container">
      <Routes>
        <Route path="/start/:queueId" element={<SurveyStartComponent />} />
        <Route path="/:queueId/:surveyId" element={<SurveyComponent navigateToFinish={navigateToFinish}/>} />
        <Route path="/finish" element={<SurveyFinishComponent assignedNumber={assignedNumber}/>} />
      </Routes>
    </div>
  );
};
  
export default SurveyDashboardComponent;