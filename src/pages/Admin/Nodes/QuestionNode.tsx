import { TextField } from '@mui/material';
import { ChangeEvent, memo, useState } from 'react';
import { Handle, useReactFlow, Position } from 'reactflow';
import OpenWithIcon from '@mui/icons-material/OpenWith';

interface AnswerProps {
  value: string,
  handleId: string,
  nodeId: string
}

function AnswerComponent({ value, handleId, nodeId }: AnswerProps) {
  const { setNodes } = useReactFlow();
  const [answerValue, setAnswerValue] = useState<string>(value);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setAnswerValue(evt.target.value);
    setNodes((prevNodes) => {
      const updatedNodes = prevNodes.map((node) => {
        if (node.id === nodeId) {
          const updatedAnswers = node.data.answers.map((answer: Answer) => {
            if (answer.id === handleId) {
              return { ...answer, answer: evt.target.value };
            }
            return answer;
          });

          return {
            ...node,
            data: {
              ...node.data,
              answers: updatedAnswers,
            },
          };
        }

        return node;
      });

      return updatedNodes;
    });
  };

  return (
    <div className="question-node__answer">
      <TextField id="standard-basic" label="Standard" variant="standard" value={answerValue} onChange={onChange}/>
      <Handle className='right-handle' type="source" position={Position.Right} id={handleId} />
    </div>
  );
}

interface Answer {
  answer: string, 
  id: string
}

interface QuestionNodeData {
  question: string,
  answers: Answer[]
}

interface QuestionNodeParams {
  id: string,
  data: QuestionNodeData
}

function QuestionNode({ id, data }: QuestionNodeParams) {
  const { setNodes } = useReactFlow();
  const [question, setQuestion] = useState(data.question);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setQuestion(evt.target.value);
    setNodes((prevNodes) => {
      const updatedNodes = prevNodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              question: evt.target.value
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
      <div className="question-node__header">
        <TextField
          label="Question"
          multiline
          rows={4}
          defaultValue={question}
          variant="filled"
          onChange={onChange}
        />
        <Handle className='left-handle' type="target" position={Position.Left} id={id} />
      </div>
      
      <div className="question-node__body">
        {data.answers.map((answer) => (
          <AnswerComponent key={answer.id} nodeId={id} value={answer.answer} handleId={answer.id} />
        ))}
        <span className='custom-drag-handle'>
          <OpenWithIcon/>
        </span>
        
      </div>
    </>
  );
}

export default memo(QuestionNode);
