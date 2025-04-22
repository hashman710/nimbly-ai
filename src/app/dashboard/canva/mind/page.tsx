'use client'

import React, { useCallback, useState, useEffect, useRef } from 'react'
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  MiniMap,
  Node,
  Edge,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from 'reactflow'
import 'reactflow/dist/style.css'

import {
  Text,
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Smile,
  Star,
  Zap,
  Heart,
  Rocket,
} from 'lucide-react'

const iconLibrary = [
  { icon: Smile, label: 'Smile' },
  { icon: Star, label: 'Star' },
  { icon: Zap, label: 'Zap' },
  { icon: Heart, label: 'Heart' },
  { icon: Rocket, label: 'Rocket' },
]

const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 100, y: 100 },
    data: {
      label: 'Ideia Principal',
      fontSize: 16,
      fontFamily: 'Inter',
      fontStyle: '',
      textAlign: 'center',
      textColor: '#ffffff',
      borderColor: '#ffffff',
      borderWidth: 1,
      borderOpacity: 1,
      backgroundColor: '#1f1f1f',
      backgroundOpacity: 1,
      shape: 'square',
      link: '',
      icon: null,
    },
    type: 'editable',
  },
]

const initialEdges: Edge[] = []

function EditableNode({ id, data, selected }: any) {
  const [value, setValue] = useState(data.label)
  const textRef = useRef<HTMLTextAreaElement>(null)
  const [height, setHeight] = useState(48)

  useEffect(() => {
    if (textRef.current) {
      const scrollHeight = textRef.current.scrollHeight
      setHeight(Math.max(48, scrollHeight))
    }
  }, [value])

  const handleStyleChange = (field: string, value: any) => {
    data[field] = value
  }

  const Icon = data.icon

  return (
    <div className="relative min-w-[150px] max-w-[300px]">
      {selected && (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-50 bg-white text-black shadow-md rounded-xl flex gap-2 px-3 py-2 items-center">
          <select defaultValue={data.fontFamily} onChange={(e) => handleStyleChange('fontFamily', e.target.value)} title="Fonte" className="text-sm border rounded px-1 hover:border-black">
            <option value="Noto Sans">Noto Sans</option>
            <option value="Inter">Inter</option>
          </select>
          <input type="number" defaultValue={data.fontSize} onChange={(e) => handleStyleChange('fontSize', parseInt(e.target.value))} title="Tamanho da Fonte" className="w-12 text-sm px-1 border rounded hover:border-black" />
          <button onClick={() => handleStyleChange('fontStyle', data.fontStyle === 'bold' ? '' : 'bold')} title="Negrito" className="hover:bg-black/10 p-1 rounded"><Bold className="w-4 h-4" /></button>
          <button onClick={() => handleStyleChange('fontStyle', data.fontStyle === 'italic' ? '' : 'italic')} title="Itálico" className="hover:bg-black/10 p-1 rounded"><Italic className="w-4 h-4" /></button>
          <button onClick={() => handleStyleChange('fontStyle', data.fontStyle === 'underline' ? '' : 'underline')} title="Sublinhado" className="hover:bg-black/10 p-1 rounded"><Underline className="w-4 h-4" /></button>
          <button onClick={() => handleStyleChange('textAlign', 'left')} title="Alinhar à Esquerda" className="hover:bg-black/10 p-1 rounded"><AlignLeft className="w-4 h-4" /></button>
          <button onClick={() => handleStyleChange('textAlign', 'center')} title="Centralizar" className="hover:bg-black/10 p-1 rounded"><AlignCenter className="w-4 h-4" /></button>
          <button onClick={() => handleStyleChange('textAlign', 'right')} title="Alinhar à Direita" className="hover:bg-black/10 p-1 rounded"><AlignRight className="w-4 h-4" /></button>
          <button onClick={() => handleStyleChange('textAlign', 'justify')} title="Justificar" className="hover:bg-black/10 p-1 rounded"><AlignJustify className="w-4 h-4" /></button>
          <input type="color" defaultValue={data.textColor} onChange={(e) => handleStyleChange('textColor', e.target.value)} title="Cor do Texto" className="hover:cursor-pointer" />
          <input type="color" defaultValue={data.borderColor} onChange={(e) => handleStyleChange('borderColor', e.target.value)} title="Cor da Borda" className="hover:cursor-pointer" />
          <input type="color" defaultValue={data.backgroundColor} onChange={(e) => handleStyleChange('backgroundColor', e.target.value)} title="Cor de Fundo" className="hover:cursor-pointer" />
          <button onClick={() => handleStyleChange('link', prompt('Cole o link aqui:', data.link) || '')} title="Adicionar Link" className="hover:bg-black/10 p-1 rounded"><Link className="w-4 h-4" /></button>
        </div>
      )}
      <div
        className="p-2 flex flex-col items-center"
        style={{
          height,
          fontSize: data.fontSize,
          fontFamily: data.fontFamily,
          textAlign: data.textAlign,
          color: data.textColor,
          backgroundColor: data.backgroundColor,
          border: `${data.borderWidth}px solid ${data.borderColor}`,
        }}
      >
        {Icon && <Icon className="w-6 h-6 mb-1" />}
        <textarea
          ref={textRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-transparent resize-none overflow-hidden focus:outline-none text-center"
          style={{
            fontSize: data.fontSize,
            fontFamily: data.fontFamily,
            textAlign: data.textAlign,
            color: data.textColor,
          }}
        />
      </div>
      <Handle type="source" position={Position.Right} className="w-2 h-2 bg-purple-500 absolute right-[-4px] top-1/2 -translate-y-1/2" />
      <Handle type="target" position={Position.Left} className="w-2 h-2 bg-purple-500 absolute left-[-4px] top-1/2 -translate-y-1/2" />
    </div>
  )
}

const nodeTypes = { editable: EditableNode }

export default function MindMapPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [idCounter, setIdCounter] = useState(2)

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const addNode = (label: string, type: string = 'editable', icon: any = null) => {
    const newNode: Node = {
      id: `${idCounter}`,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label, fontSize: 16, icon },
      type,
    }
    setNodes((nds) => [...nds, newNode])
    setIdCounter((prev) => prev + 1)
  }

  const addIconNode = (icon: any) => {
    addNode('Texto', 'editable', icon)
  }

  return (
    <ReactFlowProvider>
      <div className="h-[calc(100vh-4rem)] bg-black rounded-xl relative flex">
        <aside className="w-20 bg-[#111] p-2 border-r border-white/10 text-white space-y-3 flex flex-col items-center overflow-y-auto">
          <button onClick={() => addNode('Texto')} title="Adicionar Texto"><Text className="w-5 h-5" /></button>
          {iconLibrary.map(({ icon: Icon, label }) => (
            <button key={label} onClick={() => addIconNode(Icon)} title={`Adicionar ${label}`}><Icon className="w-5 h-5" /></button>
          ))}
          <div className="mt-auto space-y-2">
            <button title="Desfazer"><Undo2 className="w-5 h-5" /></button>
            <button title="Refazer"><Redo2 className="w-5 h-5" /></button>
          </div>
        </aside>
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            nodeTypes={nodeTypes}
          >
            <Background variant="dots" gap={12} size={1} />
            <MiniMap zoomable pannable className="bg-[#1a1a1a]" />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </ReactFlowProvider>
  )
}
