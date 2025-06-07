import React from 'react'

const ResetButton = ({ onReset }) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={onReset} style={{ padding: '0.5rem 1rem' }}>
        Resetar Analisador
      </button>
    </div>
  )
}

export default ResetButton
