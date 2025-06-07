// src/logic/trie.js

export class TrieNode {
    constructor(char = '', depth = 0) {
      this.char = char
      this.children = {}
      this.isWord = false
      this.depth = depth // passo (linha no grid)
      this.id = null     // será usado para exibir q0, q1, ...
    }
  }
  
  export class Trie {
    constructor() {
      this.root = new TrieNode()
      this.stateCounter = 0
    }
  
    insert(word) {
      let node = this.root
      for (let i = 0; i < word.length; i++) {
        const char = word[i]
        if (!node.children[char]) {
          const newNode = new TrieNode(char, i)
          newNode.id = `q${this.stateCounter++}`
          node.children[char] = newNode
        }
        node = node.children[char]
      }
      node.isWord = true
    }
  
    reset() {
      this.root = new TrieNode()
      this.stateCounter = 0
    }
  
    /**
     * Percorre a trie com base em uma string e retorna os nós visitados.
     * Usado para pintar azul/vermelho no grid.
     */
    traverse(input) {
      let node = this.root
      const path = []
      for (let i = 0; i < input.length; i++) {
        const char = input[i]
        if (node.children[char]) {
          node = node.children[char]
          path.push({ char, node, valid: true })
        } else {
          path.push({ char, node: null, valid: false })
          break // interrompe na primeira letra inválida
        }
      }
      return path
    }
  
    /**
     * Retorna os nós organizados por linha (profundidade) para exibir no grid.
     */
    getNodesByDepth() {
      const result = {}
  
      const dfs = (node) => {
        if (!result[node.depth]) {
          result[node.depth] = {}
        }
  
        if (!result[node.depth][node.char]) {
          result[node.depth][node.char] = []
        }
  
        result[node.depth][node.char].push(node)
  
        for (const child of Object.values(node.children)) {
          dfs(child)
        }
      }
  
      for (const child of Object.values(this.root.children)) {
        dfs(child)
      }
  
      return result // {0: {a: [q0]}, 1: {r: [q1]}, ...}
    }
  }
  