import { useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import { Answer } from "../../models/Answer";
import { Button } from "@mui/material";
import { Question } from "../../models/Question";
import './SurveyStyles.scss';

const SurveyComponent = ({ navigateToFinish }: { navigateToFinish: (number: number, queueId: string) => void }) => {
  const { axiosInstance } = useUser();
  const { queueId, surveyId } = useParams();
  const [question, setQuestion] = useState<Question>({ _id: '', question: '' });
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [error, setError] = useState<string | undefined>('');

  const selectAnswer = async (answerId: string) => {
    try {
      setError('');
      const response = await axiosInstance.post('/client/survey/' + queueId + '/' + surveyId, {
        answerId: answerId,
        questionId: question._id,
      });
      const data = await response.data;

      if (data.finished) {
        navigateToFinish(data.assignedNumber, queueId ? queueId : '');
      } else {
        setQuestion(data.question);
        setAnswers(data.answers);
      }
    } catch (error: any) {
      setError(error?.response?.data);
      console.error('Error selecting answer:', error?.response?.data);
    }
  }

  useEffect(() => {
    const getSurvey = async () => {
      try {
        const response = await axiosInstance.get('/client/survey/' + queueId + '/' + surveyId);
        const data = await response.data;
        if (data.finished) {
          navigateToFinish(data.assignedNumber, queueId ? queueId : '');
        } else {
          setQuestion(data.question);
          setAnswers(data.answers);
        }
      } catch (error: any) {
        setError(error?.response?.data);
        console.error('Error getting survey:', error?.response?.data);
      }
    }
    getSurvey();
  }, []);

  return (
    <div className="question-box">
      <h2 className="first-item">{question.question}</h2>
      <div className="answers-box">
        {answers.map((answer) => (
          <Button className="answer-button" onClick={() => selectAnswer(answer._id)} key={answer._id}>{answer.answer}</Button>
        ))}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SurveyComponent;