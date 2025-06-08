import React, { useState } from 'react'

const WordInput = ({ aoAdicionar }) => {
  const [palavra, definirPalavra] = useState('')

  const adicionar = () => {
    const limpa = palavra.trim()
    if (limpa) {
      aoAdicionar(limpa)
      definirPalavra('')
    }
  }

  const pressionarEnter = (e) => {
    if (e.key === 'Enter') {
      adicionar()
    }
  }

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Adicionar palavra"
        value={palavra}
        onChange={(e) => definirPalavra(e.target.value)}
        onKeyDown={pressionarEnter}
        style={{ padding: '0.5rem', fontSize: '1rem' }}
      />
      <button onClick={adicionar} style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem' }}>
        Adicionar
      </button>
    </div>
  )
}

export default WordInput
