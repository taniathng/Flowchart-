import { useCallback, useState} from 'react';
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
import { AppNode, StepNode } from './nodes/types';


export default function App() {
  const [nodes, setNodes , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<StepNode | null>(null);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );
  // // Clicking on a node will toggle between the original label and the description
  // const handleNodeClick = useCallback(
  //   (event: React.MouseEvent, clickedNode: AppNode) => {
  //     setNodes((prevNodes) =>
  //       prevNodes.map((node) =>
  //         node.id === clickedNode.id
  //           ? {
  //               ...node,
  //               data: {
  //                 ...node.data,
  //                 label: 
  //                   // Check if `description` exists
  //                   'description' in clickedNode.data && clickedNode.data.description
  //                     ? node.data.label === clickedNode.data.description
  //                       ? clickedNode.data.originalLabel || node.data.label // Toggle back to the original label
  //                       : clickedNode.data.description // Toggle to description
  //                     : node.data.label, // Fallback if `description` doesn't exist
  //                 originalLabel: node.data.label, // Store the original label
  //               },
  //             }
  //           : node
  //       )
  //     );
  //   },
  //   [setNodes]
  // );

  // Clicking on a node will expand a sidebar with the description.
  const handleNodeClick = useCallback(
    (event: React.MouseEvent, clickedNode: AppNode) => {
      console.log('clickedNode', clickedNode);
      if (selectedNode === null) {
        setSelectedNode(clickedNode);
      } else {
        if (selectedNode.id === clickedNode.id) {
          setSelectedNode(null);
        } else {
          setSelectedNode(clickedNode);
        }
      }
    },
    [selectedNode, setNodes, setEdges]
  )
  
  
  


  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{flex:1}}>
        <h1>ReactFlowDemo</h1>
      </header>
      <div style={{ display: 'flex', height: '80vh', flex:9 }}>
        <div style={{ flex: 4}}>
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
        </div>
        {selectedNode && (
          <div style={{ flex: 1, padding: '10px', border: '3px solid #000000'}}>
            <h3>Selected Node</h3>
            <p>ID: {selectedNode.id}</p>
            <p>Label: {selectedNode.data.label}</p>
            <p>Position: {`x: ${selectedNode.position.x}, y: ${selectedNode.position.y}`}</p>
            <p>Description: {selectedNode.data.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
