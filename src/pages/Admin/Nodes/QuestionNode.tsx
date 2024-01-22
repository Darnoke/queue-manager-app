import { TextField } from '@mui/material';
import { ChangeEvent, memo, useState } from 'react';
import { Handle, useReactFlow, Position } from 'reactflow';
import { OpenWith, Add, Remove } from '@mui/icons-material';

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

  const removeAnswer = () => {
    if (!window.confirm("Delete answer: " + answerValue + "?")) return;
    
    setNodes((prevNodes) => {
      const updatedNodes = prevNodes.map((node) => {
        if (node.id === nodeId) {
          const updatedAnswers = node.data.answers.filter((answer: Answer) => answer.id !== handleId);

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
      <span className='remove-button' onClick={removeAnswer}>
        <Remove />
      </span>
      <TextField id="standard-basic" label={handleId} variant="standard" value={answerValue} onChange={onChange}/>
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

  const getNextFreeId = (answers: Answer[]) => {
    const existingIds = answers.map((answer) => answer.id);
    let idCounter = 0;
    let nextId;
  
    while (true) {
      nextId = `ans-${idCounter}`;
      if (!existingIds.includes(nextId)) {
        break;
      }
      idCounter++;
    }
  
    return nextId;
  };

  const addAnswer = () => {
    if (data.answers.length >= 8) return; // Add toastr
    setNodes((prevNodes) => {
      const updatedNodes = prevNodes.map((node) => {
        if (node.id === id) {
          const nextId = getNextFreeId(node.data.answers);
          const updatedAnswers = [
            ...node.data.answers,
            { id: nextId, answer: nextId },
          ];

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
  }

  return (
    <>
      <div className="question-node__header" data-testid="question-node">
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
        <div className="buttons">
          <span className='custom-drag-handle'>
            <OpenWith/>
          </span>
          <span className='add-button' onClick={addAnswer}>
            <Add/>
          </span>
        </div>
      </div>
    </>
  );
}

export default memo(QuestionNode);
