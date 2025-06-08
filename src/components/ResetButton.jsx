import React from 'react'

const ResetButton = ({ aoResetar }) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={aoResetar} style={{ padding: '0.5rem 1rem' }}>
        Resetar Analisador
      </button>
    </div>
  )
}

export default ResetButton
