import { MarkerType } from 'reactflow';

export const nodes = [
    {
      id: '1',
      data: {
        label: 'Default Node',
      },
      position: { x: 250, y: 0 },
    },
    {
      id: '2',
      data: {
        label: 'Default Node',
      },
      position: { x: 100, y: 100 },
    },
    {
      id: '3',
      type: 'output',
      data: {
        label: 'Output Node',
      },
      position: { x: 400, y: 100 },
    },
    {
      id: '4',
      type: 'question',
      position: { x: 100, y: 200 },
      data: {
        question: "This is a test",
        answers: [
            {
                id: 'ans-0',
                answer: 'test 0'
            },
            {
                id: 'ans-1',
                answer: 'test 1'
            },
        ]
      },
    },
]

export const edges = [
    { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' },
    { id: 'e1-3', source: '1', target: '3', animated: true },
    {
      id: 'e4-3',
      source: '4',
      target: '3',
      type: 'smoothstep',
      sourceHandle: 'ans-0',
      data: {
        selectIndex: 0,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    },
  ];