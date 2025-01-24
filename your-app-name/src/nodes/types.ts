import type { Node, BuiltInNode } from '@xyflow/react';

export type PositionLoggerNode = Node<{ label: string }, 'position-logger'>;
export type StepNode = Node<{ label: string, description: string }, 'step'>;
export type AppNode = BuiltInNode | PositionLoggerNode | StepNode;

