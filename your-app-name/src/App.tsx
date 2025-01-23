import { useCallback} from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { initialNodes, nodeTypes } from './nodes';
import { initialEdges, edgeTypes } from './edges';
import { AppNode } from './nodes/types';


export default function App() {
  const [nodes, setNodes , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  const handleNodeClick = useCallback(
    (event: React.MouseEvent, clickedNode: AppNode) => {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === clickedNode.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  label: 
                    // Check if `description` exists
                    'description' in clickedNode.data && clickedNode.data.description
                      ? node.data.label === clickedNode.data.description
                        ? clickedNode.data.originalLabel || node.data.label // Toggle back to the original label
                        : clickedNode.data.description // Toggle to description
                      : node.data.label, // Fallback if `description` doesn't exist
                  originalLabel: node.data.label, // Store the original label
                },
              }
            : node
        )
      );
    },
    [setNodes]
  );
  
  
  
  


  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={handleNodeClick}
      fitView
    >
      <Background />
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
}
