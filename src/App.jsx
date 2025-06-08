import React, { useState, useRef } from "react";
import WordInput from "./components/WordInput";
import TypingArea from "./components/TypingArea";
import LexicalGrid from "./components/LexicalGrid";
import ResetButton from "./components/ResetButton";
import { ArvoreTrie } from "./logic/trie";

function App() {
  const [words, setWords] = useState([]);
  const [input, setInput] = useState("");
  const [path, setPath] = useState([]);

  const trieRef = useRef(new ArvoreTrie());

  const addWord = (word) => {
    const normalized = word.toLowerCase();
    if (!normalized) return;
    if (words.includes(normalized)) return;

    setWords((prev) => [...prev, normalized]);
    trieRef.current.inserir(normalized);
  };

  const resetWords = () => {
    setWords([]);
    setInput("");
    setPath([]);
    trieRef.current.resetar();
  };

  const handleTypingChange = (value) => {
    const inputValue = value.toLowerCase();
    setInput(inputValue);
    const traversalPath = trieRef.current.percorrerEntrada(inputValue);
    setPath(traversalPath);
  };

  return (
    <div style={{ paddingTop: "4rem", fontFamily: "sans-serif" }}>
      <header
        style={{
          position: "fixed",
          top: "1rem",
          left: "1rem",
          fontWeight: "bold",
        }}
      >
        <h1>Analisador Léxico Visual</h1>
      </header>

      <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
        <WordInput aoAdicionar={addWord} />
        <div
          style={{
            margin: "1rem 0",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            maxHeight: "150px",
            overflowY: "auto",
          }}
        >
          <h3>Palavras cadastradas:</h3>
          {words.length === 0 ? (
            <p style={{ color: "#666" }}>Nenhuma palavra adicionada ainda.</p>
          ) : (
            <ul>
              {words.map((palavra, idx) => (
                <li key={idx}>{palavra}</li>
              ))}
            </ul>
          )}
        </div>
        <TypingArea value={input} aoAlterar={handleTypingChange} />
        <LexicalGrid analisador={trieRef.current} caminho={path} />
        <ResetButton aoResetar={resetWords} />
      </main>
    </div>
  );
}

export default App;
