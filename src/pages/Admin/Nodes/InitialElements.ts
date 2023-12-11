// import { MarkerType } from 'reactflow';

import { Edge, Node } from "reactflow";

export const nodes: Node[] = [
    {
      id: '1',
      type: 'start',
      position: { x: 250, y: 0 },
      data: {},
    },
    {
      id: '2',
      type: 'question',
      dragHandle: '.custom-drag-handle',
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

export const edges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2'},
    // {
    //   id: 'e4-3',
    //   source: '4',
    //   target: '3',
    //   type: 'smoothstep',
    //   sourceHandle: 'ans-0',
    //   data: {
    //     selectIndex: 0,
    //   },
    //   markerEnd: {
    //     type: MarkerType.ArrowClosed,
    //   },
    // },
  ];