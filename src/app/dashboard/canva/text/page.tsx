'use client'

import { useState, useRef } from 'react'
import { GripVertical, MoreHorizontal } from 'lucide-react'
import { nanoid } from 'nanoid'
import clsx from 'clsx'

const blockTypes = {
  text: 'Texto',
  heading1: 'Título 1',
  heading2: 'Título 2',
  bullet: 'Lista com pontos',
  image: 'Imagem',
  video: 'Vídeo',
  embed: 'Embed',
  column: 'Nova Coluna'
}

const defaultBlock = (type = 'text') => ({
  id: nanoid(),
  type,
  content: '',
  align: 'left'
})

export default function TextCanvasPage() {
  const [columns, setColumns] = useState([[defaultBlock()]])
  const [menuBlockId, setMenuBlockId] = useState(null)
  const inputRefs = useRef({})
  const [title, setTitle] = useState('Clique para adicionar um título')
  const [coverUrl, setCoverUrl] = useState('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80')

  const handleInput = (id, value) => {
    setColumns((prev) =>
      prev.map(col =>
        col.map(block => (block.id === id ? { ...block, content: value } : block))
      )
    )
  }

  const handleKeyDown = (e, id, colIdx) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      setColumns((prev) => {
        const newCols = [...prev]
        const idx = newCols[colIdx].findIndex((b) => b.id === id)
        newCols[colIdx].splice(idx + 1, 0, defaultBlock())
        setTimeout(() => {
          const nextId = newCols[colIdx][idx + 1].id
          inputRefs.current[nextId]?.focus()
        }, 10)
        return newCols
      })
    } else if (e.key === '/' && !e.shiftKey) {
      setMenuBlockId(id)
    }
  }

  const applyBlockType = (id, type) => {
    if (type === 'column') {
      addColumn()
      setMenuBlockId(null)
      return
    }
    setColumns((prev) =>
      prev.map(col =>
        col.map((block) => (block.id === id ? { ...block, type } : block))
      )
    )
    setMenuBlockId(null)
  }

  const toggleAlign = (id, align) => {
    setColumns((prev) =>
      prev.map(col =>
        col.map((block) => (block.id === id ? { ...block, align } : block))
      )
    )
  }

  const addColumn = () => {
    setColumns(prev => [...prev, [defaultBlock()]])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0c0017] to-black text-white">
      <div
        className="h-48 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${coverUrl})` }}
      />

      <div className="p-10 max-w-4xl mx-auto">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-4xl font-bold text-white bg-transparent outline-none mb-8"
        />

        <div className="flex gap-4 max-w-full overflow-auto">
          {columns.map((blocks, colIdx) => (
            <div key={colIdx} className="flex-1 min-w-[300px] space-y-2">
              {blocks.map((block) => (
                <div key={block.id} className="group relative flex items-start gap-2">
                  <div className="invisible group-hover:visible flex flex-col items-center pt-2">
                    <button className="text-white/50 hover:text-white">
                      <GripVertical size={16} />
                    </button>
                    <button onClick={() => setMenuBlockId(block.id)} className="text-white/50 hover:text-white">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>

                  <div className="flex-1">
                    {block.type === 'image' ? (
                      <div className="border border-white/10 rounded p-4 bg-white/5 text-center">[Imagem]</div>
                    ) : block.type === 'video' ? (
                      <div className="border border-white/10 rounded p-4 bg-white/5 text-center">[Vídeo]</div>
                    ) : block.type === 'embed' ? (
                      <div className="border border-white/10 rounded p-4 bg-white/5 text-center">[Embed]</div>
                    ) : (
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        ref={(el) => {
                          if (el) {
                            inputRefs.current[block.id] = el
                            if (el.innerText !== block.content) {
                              el.innerText = block.content
                            }
                          }
                        }}
                        onInput={(e) => handleInput(block.id, e.currentTarget.innerText)}
                        onKeyDown={(e) => handleKeyDown(e, block.id, colIdx)}
                        className={clsx(
                          'focus:outline-none py-1 px-2 rounded w-full break-words whitespace-pre-wrap',
                          block.type === 'heading1' && 'text-3xl font-bold',
                          block.type === 'heading2' && 'text-2xl font-semibold',
                          block.type === 'bullet' && 'pl-4 list-disc',
                          block.align === 'center' && 'text-center',
                          block.align === 'right' && 'text-right',
                          block.align === 'left' && 'text-left'
                        )}
                        style={{ direction: 'ltr' }}
                      />
                    )}

                    {menuBlockId === block.id && (
                      <div className="absolute left-6 top-full mt-1 bg-neutral-800 text-white rounded shadow-lg z-50 border border-white/10 p-2 w-64 space-y-1">
                        <div className="text-xs text-white/50 px-1">Tipo de Bloco</div>
                        {Object.entries(blockTypes).map(([key, label]) => (
                          <button
                            key={key}
                            onClick={() => applyBlockType(block.id, key)}
                            className="w-full text-left px-2 py-1 hover:bg-neutral-700 rounded text-sm"
                          >
                            {label}
                          </button>
                        ))}
                        <div className="mt-2 text-xs text-white/50 px-1">Alinhamento</div>
                        {['left', 'center', 'right'].map((a) => (
                          <button
                            key={a}
                            onClick={() => toggleAlign(block.id, a)}
                            className="w-full text-left px-2 py-1 hover:bg-neutral-700 rounded text-sm"
                          >
                            {a === 'left' ? 'Esquerda' : a === 'center' ? 'Centralizado' : 'Direita'}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
