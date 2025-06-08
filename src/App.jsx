import React, { useState, useRef } from 'react'
import WordInput from './components/WordInput'
import TypingArea from './components/TypingArea'
import LexicalGrid from './components/LexicalGrid'
import ResetButton from './components/ResetButton'
import { ArvoreTrie } from './logic/trie'

function App() {
  const [words, setWords] = useState([])
  const [input, setInput] = useState('')
  const [path, setPath] = useState([])

  const trieRef = useRef(new ArvoreTrie())

  const addWord = (word) => {
    const normalized = word.toLowerCase()
    if (!normalized) return
    if (words.includes(normalized)) return

    setWords((prev) => [...prev, normalized])
    trieRef.current.inserir(normalized)
  }

  const resetWords = () => {
    setWords([])
    setInput('')
    setPath([])
    trieRef.current.resetar()
  }

  const handleTypingChange = (value) => {
    const inputValue = value.toLowerCase()
    setInput(inputValue)
    const traversalPath = trieRef.current.percorrerEntrada(inputValue)
    setPath(traversalPath)
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Analisador Léxico Visual</h1>
      <WordInput aoAdicionar={addWord} />
      <TypingArea value={input} aoAlterar={handleTypingChange} />
      <LexicalGrid analisador={trieRef.current} caminho={path} />
      <ResetButton aoResetar={resetWords} />
    </div>
  )
}

export default App
