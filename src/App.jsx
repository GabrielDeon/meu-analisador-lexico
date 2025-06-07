import React, { useState, useRef } from 'react'
import WordInput from './components/WordInput'
import TypingArea from './components/TypingArea'
import LexicalGrid from './components/LexicalGrid'
import ResetButton from './components/ResetButton'
import { Trie } from './logic/trie'

function App() {
  const [words, setWords] = useState([])
  const [input, setInput] = useState('')
  const [path, setPath] = useState([])

  const trieRef = useRef(new Trie())

  const addWord = (word) => {
    const normalized = word.toLowerCase()
    if (!normalized) return
    if (words.includes(normalized)) return

    setWords((prev) => [...prev, normalized])
    trieRef.current.insert(normalized)
  }

  const resetWords = () => {
    setWords([])
    setInput('')
    setPath([])
    trieRef.current.reset()
  }

  const handleTypingChange = (value) => {
    const inputValue = value.toLowerCase()
    setInput(inputValue)
    const traversalPath = trieRef.current.traverse(inputValue)
    setPath(traversalPath)
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Analisador Léxico Visual</h1>
      <WordInput onAddWord={addWord} />
      <TypingArea value={input} onChange={handleTypingChange} />
      <LexicalGrid trie={trieRef.current} input={input} path={path} />
      <ResetButton onReset={resetWords} />
    </div>
  )
}

export default App
