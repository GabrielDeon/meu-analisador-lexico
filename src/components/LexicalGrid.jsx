import React from 'react'
import './LexicalGrid.css'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('')

const LexicalGrid = ({ trie, path }) => {
  const gridData = trie.getNodesByDepth()

  const activeMap = {}
  path.forEach((step, index) => {
    const key = `${index}-${step.char}`
    activeMap[key] = step.valid ? 'valid' : 'invalid'
  })

  const maxDepth = Math.max(...Object.keys(gridData).map(Number), 0)

  return (
    <div className="lexical-grid">
      <table>
        <thead>
          <tr>
            <th>qN</th>
            {ALPHABET.map((char) => (
              <th key={char}>{char.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: maxDepth + 1 }).map((_, depth) => (
            <tr key={depth}>
              <td><strong>q{depth}</strong></td>
              {ALPHABET.map((char) => {
                const nodes = gridData?.[depth]?.[char] || []
                const cellKey = `${depth}-${char}`

                let cellClass = ''
                if (activeMap[cellKey] === 'valid') cellClass = 'valid'
                else if (activeMap[cellKey] === 'invalid') cellClass = 'invalid'

                return (
                  <td key={char} className={cellClass}>
                    {nodes.map((n) => n.id).join(', ')}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LexicalGrid
