import React, { useState } from 'react'

const WordInput = ({ onAddWord }) => {
  const [word, setWord] = useState('')

  const handleAdd = () => {
    if (word.trim()) {
      onAddWord(word.trim())
      setWord('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Adicionar palavra"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ padding: '0.5rem', fontSize: '1rem' }}
      />
      <button onClick={handleAdd} style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem' }}>
        Adicionar
      </button>
    </div>
  )
}

export default WordInput
