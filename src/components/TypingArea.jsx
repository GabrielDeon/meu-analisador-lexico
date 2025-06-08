import React from 'react'

const TypingArea = ({ valor, aoAlterar }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Digite aqui..."
        value={valor}
        onChange={(e) => aoAlterar(e.target.value)}
        style={{ padding: '0.5rem', fontSize: '1rem', width: '100%' }}
      />
    </div>
  )
}

export default TypingArea
