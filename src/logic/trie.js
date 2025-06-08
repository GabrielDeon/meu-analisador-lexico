export class NoTrie {
  constructor(letra = '', nivel = 0) {
    this.letra = letra
    this.filhos = {}
    this.ehPalavra = false
    this.nivel = nivel // representa a linha na grade
    this.id = null     // usado para exibir q0, q1, ...
  }
}

export class ArvoreTrie {
  constructor() {
    this.raiz = new NoTrie()
    this.contadorEstados = 0
  }

  inserir(palavra) {
    let atual = this.raiz
    for (let i = 0; i < palavra.length; i++) {
      const letra = palavra[i]
      if (!atual.filhos[letra]) {
        const novoNo = new NoTrie(letra, i)
        novoNo.id = `q${this.contadorEstados++}`
        atual.filhos[letra] = novoNo
      }
      atual = atual.filhos[letra]
    }
    atual.ehPalavra = true
  }

  resetar() {
    this.raiz = new NoTrie()
    this.contadorEstados = 0
  }

  /**
   * Percorre a árvore com base no texto digitado e retorna os nós visitados.
   * Utilizado para marcar as células no grid como válidas ou inválidas.
   */
  percorrerEntrada(texto) {
    let atual = this.raiz
    const caminho = []

    for (let i = 0; i < texto.length; i++) {
      const letra = texto[i]
      if (atual.filhos[letra]) {
        atual = atual.filhos[letra]
        caminho.push({ letra, no: atual, valido: true })
      } else {
        caminho.push({ letra, no: null, valido: false })
        break // para no primeiro erro
      }
    }

    return caminho
  }

  /**
   * Retorna os nós organizados por linha (nível de profundidade) para exibir no grid.
   */
  obterNosPorNivel() {
    const resultado = {}

    const visitar = (no) => {
      if (!resultado[no.nivel]) {
        resultado[no.nivel] = {}
      }

      if (!resultado[no.nivel][no.letra]) {
        resultado[no.nivel][no.letra] = []
      }

      resultado[no.nivel][no.letra].push(no)

      for (const filho of Object.values(no.filhos)) {
        visitar(filho)
      }
    }

    for (const filho of Object.values(this.raiz.filhos)) {
      visitar(filho)
    }

    return resultado
  }
}
